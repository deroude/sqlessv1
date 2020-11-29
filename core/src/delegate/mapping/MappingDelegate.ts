import { Delegate } from "../Delegate";
import { ObjectMappingConfig } from "./MappingConfig";

export class MappingDelegate implements Delegate {

    constructor(config: ObjectMappingConfig) { }

    async process(context: any, params: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

}