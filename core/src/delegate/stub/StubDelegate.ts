import { Delegate } from "../Delegate";
import { StubConfig } from "./StubConfig";

export class StubDelegate implements Delegate {

    constructor(private config: StubConfig) { }

    async process(context: any, params: any): Promise<void> {
        params[this.config.assign] = this.config.payload;
        return Promise.resolve();
    }
}