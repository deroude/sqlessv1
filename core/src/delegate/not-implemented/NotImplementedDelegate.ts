import { Delegate } from "../Delegate";

export class NotImplementedDelegate implements Delegate {
    
    async process(context: any, params: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

}