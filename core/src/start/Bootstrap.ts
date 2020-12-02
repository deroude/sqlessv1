import { BootstrapConfig } from './BootstrapConfig';
import { DEFAULT_CONFIG, SQLessConfig } from '../sqless/SQLessConfig';
import { SQLess } from '../sqless/SQLess';
import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';
import { PostgresService } from '../service/postgres/PostgresService';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { loadDelegate } from '../delegate/DelegateConfig';
import { MethodDelegateConfig } from '../delegate/MethodDelegateConfig';
import { NotImplementedDelegate } from '../delegate/not-implemented/NotImplementedDelegate';
import { MethodDelegate } from '../delegate/MethodDelegate';


export class Bootstrap {
    constructor(private argv: BootstrapConfig) { }

    async start(): Promise<void> {
        let config = DEFAULT_CONFIG;

        let configCwd: string = '';

        const context: any = {};

        console.log(`Loading config from ${this.argv.configPath}`);
        if (this.argv.configPath && fs.existsSync(this.argv.configPath)) {
            configCwd = path.dirname(this.argv.configPath);
            try {
                config = yaml.safeLoad(fs.readFileSync(this.argv.configPath, 'utf-8')) as SQLessConfig;
                console.log('Config file loaded');
            } catch (err) {
                console.error('Unable to load Config file');
                console.error(err);
                Promise.reject(err);
            }
        } else {
            console.warn(`Config file ${this.argv.configPath} not found, loading defaults`);
        }

        let api: OpenAPIV3.Document;

        if (config.apiPath) {
            const apiPath = path.resolve(configCwd, config.apiPath);
            console.log(`Loading API from ${apiPath}`);
            if (fs.existsSync(apiPath)) {
                try {
                    api = yaml.safeLoad(fs.readFileSync(apiPath, 'utf-8')) as OpenAPIV3.Document;
                    console.log('API file loaded');
                } catch (err) {
                    console.error(`Unable to load API file [${apiPath}]`);
                    console.error(err);
                    Promise.reject(err);
                }
            }
        }

        if (!api) {
            console.error(`No API file available`);
            Promise.reject('No API file available');
        }

        if (config.dbConnection && config.dbConnection.type === 'postgres') {

            let persistence: PostgresService;

            console.log('Initializing Postgres');
            try {
                persistence = new PostgresService(config.dbConnection, this.argv.tenant || 'local');
            } catch (err) {
                console.error(err);
            }

            if (!persistence) {
                console.error('No persistence available');
                return Promise.reject('No persistence available');
            }

            if (config.migrations) {
                console.log('Applying migrations...');
                try {
                    await persistence.executeMigration(config.migrations.map(m => ({
                        id: m.id,
                        apply: fs.readFileSync(path.resolve(configCwd, m.applyPath), 'utf-8'),
                        rollback: fs.readFileSync(path.resolve(configCwd, m.rollbackPath), 'utf-8')
                    })));
                } catch (err) {
                    console.error('Unable to apply migrations');
                    console.error(err);
                    return Promise.reject(err);
                }
                console.log('Migrations finished.');
            }

            context.persistence = persistence;
        }

        const methodExecutors: { [path: string]: { [method: string]: MethodDelegate } } = {};
        if (config.methodPaths) {
            console.log('Attaching API delegates...');
            Object.keys(config.methodPaths).forEach(dPath => {
                Object.keys(config.methodPaths[dPath]).forEach(dMethod => {
                    const delegateConfig = config.methodPaths[dPath][dMethod];
                    console.log(`- ${dMethod.toUpperCase()} ${dPath}`)
                    const methodConfig: MethodDelegateConfig = yaml.safeLoad(
                        fs.readFileSync(
                            path.resolve(configCwd, delegateConfig.path), 'utf-8')
                    ) as MethodDelegateConfig;
                    if (methodExecutors[dPath] === undefined) methodExecutors[dPath] = {};
                    methodExecutors[dPath][dMethod] = {
                        pipe: methodConfig.pipe.map(cfg => loadDelegate(cfg)),
                        returnVar: methodConfig.returnVar,
                        transactional: methodConfig.transactional
                    };
                });
            });

            // Fill non-delegated paths with defaults
            for (const [apiPath, item] of Object.entries(api.paths)) {
                for (const method of Object.keys(item)) {
                    if (methodExecutors[apiPath] === undefined) methodExecutors[apiPath] = {};
                    if (methodExecutors[apiPath][method] === undefined) {
                        console.log(`- [default] ${method.toUpperCase()} ${apiPath}`)
                        try {
                            methodExecutors[apiPath][method] = { pipe: [new NotImplementedDelegate()], transactional: false };
                        } catch (err) {
                            console.error(err);
                        }
                    }
                }
            }
            console.log('Done');
        }

        const server = new SQLess(context);

        server.start(this.argv.hostname, this.argv.port);

        await server.addAPI(null, config, api, methodExecutors);
        console.log("API ready");
        return Promise.resolve();
    }
}