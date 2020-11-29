import express, { Express } from 'express';
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import * as  OpenApiValidator from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import passport from 'passport';
import cors from 'cors';
import { SQLessConfig } from './SQLessConfig';
import { MethodDelegate } from '../delegate/Delegate';


export class SQLess {

    app: Express;
    constructor(private context: any) { }

    start(host: string, port: number): void {
        console.log('Starting Express server');
        this.app = express();

        this.app.use(bodyParser.json())


        // start the express server
        this.app.listen(port, host, () => {
            // tslint:disable-next-line:no-console
            console.log(`server started at http://${host}:${port}`);
        });
    }


    async addAPI(tenant: string, config: SQLessConfig, api: OpenAPIV3.Document, methodExecutors: { [path: string]: { [method: string]: MethodDelegate } }): Promise<void> {
        console.log(`Adding API for ${tenant || 'local environment'} ... `);
        let jwtCheck;
        let basePath = '';
        if (tenant) {
            basePath = `/tenants/${tenant}`;
        }
        const corsOptions = { origin: config.corsOrigin || `http://localhost:4200` };
        this.app.use(cors(corsOptions));
        this.app.options("*", cors(corsOptions));
        api.servers = [{ url: `${basePath}` }];
        this.app.use(`${basePath}/api-docs`, swaggerUi.serve, swaggerUi.setup(api));
        this.app.use(OpenApiValidator.middleware({
            apiSpec: api
        }));

        if (config.security) {

            this.app.use(passport.initialize());

        }

        this.app.use(async (err: any, req: any, res: any, next: any) => {
            // format error
            res.status(err.status || 500).json({
                message: err.message,
                errors: err.errors,
            });
        });
        for (const [apiPath, item] of Object.entries(api.paths)) {
            const formattedPath = apiPath.replace(/\{(.+)\}/g, ':$1');
            const opPath = `${basePath}${formattedPath}`;
            for (const method of Object.keys(item)) {
                this.expressRequest(method, opPath, jwtCheck, async (aReq, aRes) => {
                    try {
                        const params: any = { ...aReq };
                        if (methodExecutors[apiPath] && methodExecutors[apiPath][method]) {
                            const methodDelegate = methodExecutors[apiPath][method];
                            for (let delegate of methodDelegate.pipe) {
                                await delegate.process(this.context, params);
                            }
                            if (methodDelegate.returnVar) {
                                aRes.status(200).send(params[methodDelegate.returnVar]);
                            } else {
                                aRes.status(200).send();
                            }
                        } else {
                            aRes.status(501).send('Method not yet implemented');
                        }
                    } catch (err) {
                        console.error(err);
                        aRes.status(500).send(err);
                    }
                });
            }
        }

        return Promise.resolve();
    }

    // TODO write a better impl
    private expressRequest(method: string, path: string, auth: any, handler: (req: any, res: any) => Promise<void>): void {
        // return express.prototype[method].bind(this.app)
        switch (method.toLowerCase()) {
            case 'get':
                !!auth ? this.app.get(path, auth, handler) : this.app.get(path, handler);
                break;
            case 'post':
                !!auth ? this.app.post(path, auth, handler) : this.app.post(path, handler);
                break;
            case 'delete':
                !!auth ? this.app.delete(path, auth, handler) : this.app.delete(path, handler);
                break;
            case 'put':
                !!auth ? this.app.put(path, auth, handler) : this.app.put(path, handler);
                break;
            case 'patch':
                !!auth ? this.app.patch(path, auth, handler) : this.app.patch(path, handler);
                break;
        }
    }
}