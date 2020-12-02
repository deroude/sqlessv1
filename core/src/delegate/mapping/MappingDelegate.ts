import { Delegate } from "../Delegate";
import { ObjectMappingConfig } from "./MappingConfig";

export class MappingDelegate implements Delegate {

    constructor(private config: ObjectMappingConfig) { }

    async process(context: any, params: any): Promise<void> {
        const from = params[this.config.from];
        let to = null;
        if (this.config.isArray) {
            to = from.map((item:any) => this.config.fields.reduce((prev:any, curr:any) => {
                prev[curr.to] = item[curr.from];
                return prev;
            }, {}));
        } else {
            to = this.config.fields.reduce((prev:any, curr) => {
                prev[curr.to] = from[curr.from];
                return prev;
            }, {})
        }
        params[this.config.to] = to;
        return Promise.resolve();
    }

}