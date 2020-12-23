import { Persistence } from "../../service/Persistence";
import { Delegate } from "../Delegate";
import { QueryConfig } from "./QueryConfig";
import _ from 'lodash';

export class QueryDelegate implements Delegate {

    constructor(private config: QueryConfig) { }

    async process(context: any, params: any): Promise<void> {
        const persistence: Persistence = context.persistence;
        try {
            const args: any[] = (this.config.params || []).map(p => _.get(params, p));

            const re: any = await persistence.executeQuery(this.config.statement, args);
            if (this.config.assign) {
                if (this.config.resultType === 'set') {
                    params[this.config.assign] = re;
                }
                if (this.config.resultType === 'row') {
                    params[this.config.assign] = re[0];
                }
                if (this.config.resultType === 'scalar') {
                    params[this.config.assign] = Object.values(re[0])[0];
                }
            }
        } catch (err) {
            return Promise.reject(err);
        }
        return Promise.resolve();
    }

}