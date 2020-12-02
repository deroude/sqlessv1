import { Persistence } from "../../service/Persistence";
import { Delegate } from "../Delegate";
import { QueryConfig } from "./QueryConfig";

export class QueryDelegate implements Delegate {

    constructor(private config: QueryConfig) { }

    async process(context: any, params: any): Promise<void> {
        const persistence: Persistence = context.persistence;
        try {
            await persistence.executeQuery('BEGIN');
            const re = persistence.executeQuery(this.config.statement, params);
            if (this.config.assign) {
                params[this.config.assign] = re;
            }
            await persistence.executeQuery('COMMIT');
        } catch (err) {
            try {
                persistence.executeQuery('ROLLBACK');
            } catch (rbErr) {
                console.error(rbErr);
            }
            return Promise.reject(err);
        }
        return Promise.resolve();
    }

}