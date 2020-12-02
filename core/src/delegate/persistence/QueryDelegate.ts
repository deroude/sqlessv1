import { Persistence } from "../../service/Persistence";
import { Delegate } from "../Delegate";
import { QueryConfig } from "./QueryConfig";

export class QueryDelegate implements Delegate {

    constructor(private config: QueryConfig) { }

    async process(context: any, params: any): Promise<void> {
        const persistence: Persistence = context.persistence;
        try {
            const args: any[] = (this.config.params || []).map(p => params[p]);

            const re = persistence.executeQuery(this.config.statement, args);
            if (this.config.assign) {
                params[this.config.assign] = re;
            }
        } catch (err) {
            return Promise.reject(err);
        }
        return Promise.resolve();
    }

}