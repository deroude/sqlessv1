import { Delegate } from "../Delegate";
import { CustomConfig } from "./CustomConfig";

export class CustomDelegate implements Delegate {

    constructor(private config: CustomConfig) { }

    async process(context: any, params: any): Promise<void> {
        throw new Error("Method not implemented.");
    }


}