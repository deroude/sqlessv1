import { Delegate } from "../Delegate";
import { HandlebarsConfig } from "./HandlebarsConfig";
import _ from 'lodash';

export class HandlebarsDelegate implements Delegate {

    constructor(private config: HandlebarsConfig) { }

    async process(context: any, params: any): Promise<void> {
        try {
            const template = Handlebars.compile(_.get(params, this.config.templateVar));
            const data: any = {};
            if (this.config.paramVars) {
                for (const [k, val] of Object.entries(this.config.paramVars)) {
                    data[k] = _.get(params, val);
                }
            }
            params[this.config.assign] = template(data);
        } catch (err) {
            return Promise.reject(err);
        }
        return Promise.resolve();
    }
}