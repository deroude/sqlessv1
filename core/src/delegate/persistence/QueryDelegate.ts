import { Delegate } from "../Delegate";
import { QueryConfig } from "./QueryConfig";

export class QueryDelegate implements Delegate {

    constructor(config: QueryConfig) { }

    async process(context: any, params: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

}