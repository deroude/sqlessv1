import { Delegate } from "../Delegate";
import { CustomConfig } from "./CustomConfig";

export class CustomDelegate implements Delegate {

    constructor(private config: CustomConfig) { }

    async process(context: any, params: any): Promise<void> {
        const custom = require(`${process.cwd()}/${this.config.path}`);
        try{
            await custom(context,params);
            Promise.resolve();
        } catch (err){
            return Promise.reject(err);
        }
    }


}