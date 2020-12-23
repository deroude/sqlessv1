import path from "path";
import { loadDelegates, loadEntities, PathDelegate, writeFile } from "../generate/Generator";
import { loadApi, loadConfig } from "../start/Bootstrap";
import { UpdateConfig } from "./UpdateConfig";

export class Update {
    constructor(private config: UpdateConfig) { }

    async update(): Promise<void> {
        try {
            const config = await loadConfig(this.config.configPath);
            const configCwd = path.dirname(this.config.configPath);
            const api = await loadApi(path.resolve(configCwd, config.apiPath));
            const entities = loadEntities(api);
            const pathDelegates: PathDelegate[] = loadDelegates(api, entities);
            for (const delegate of pathDelegates) {
                console.log(`Writing delegates for ${delegate.path}`);
                for (const op of delegate.operations) {
                    if (config.methodPaths[delegate.path] && config.methodPaths[delegate.path][op.method]) {
                        console.log(`\t - ${op.method}: ${op.delegate} - already present`);
                        op.delegate = config.methodPaths[delegate.path][op.method].path;
                    } else {
                        console.log(`\t - ${op.method}: ${op.delegate} - added`);
                        await writeFile(`.sqless/${op.delegate}`, Handlebars.templates[op.template], op.payload);
                    }
                }
            }
            console.log("Updating SQLess config file");
            await writeFile('.sqless/sqless-config.yaml', Handlebars.templates['sqless-config.yaml'], { ...config, pathDelegates });
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }
}