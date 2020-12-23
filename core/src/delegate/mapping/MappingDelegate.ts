import { objectToSnake } from "../../generate/Generator";
import { objectToCamel } from "../../generate/Generator";
import { Delegate } from "../Delegate";
import { ObjectMappingConfig } from "./MappingConfig";


export const builtIn: { [k: string]: (from: any, isArray: boolean) => any } = {
    'snakeToCamel': (from: any, isArray: boolean): any => {
        if (!from) return null;
        if (isArray) {
            return from.map((f: any) => objectToCamel(f));
        } else {
            return objectToCamel(from);
        }
    },
    'camelToSnake': (from: any, isArray: boolean): any => {
        if (!from) return null;
        if (isArray) {
            return from.map((f: any) => objectToSnake(f));
        } else {
            return objectToSnake(from);
        }
    }
}



export class MappingDelegate implements Delegate {

    constructor(private config: ObjectMappingConfig) { }

    async process(context: any, params: any): Promise<void> {
        const from = params[this.config.from];
        if (!from) return null;
        let to = null;
        if (this.config.builtIn && builtIn[this.config.builtIn]) {
            to = builtIn[this.config.builtIn](from, this.config.isArray);
        } else {
            if (this.config.isArray) {
                to = from.map((item: any) => this.config.fields.reduce((prev: any, curr: any) => {
                    prev[curr.to] = item[curr.from];
                    return prev;
                }, {}));
            } else {
                to = this.config.fields.reduce((prev: any, curr) => {
                    prev[curr.to] = from[curr.from];
                    return prev;
                }, {})
            }
        }
        params[this.config.to] = to;
        return Promise.resolve();
    }

}