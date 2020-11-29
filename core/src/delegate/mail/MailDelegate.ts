import { Delegate } from "../Delegate";
import { MailDelegateConfig } from "./MailDelegateConfig";

export class MailDelegate implements Delegate {

    constructor(private config: MailDelegateConfig) { }

    async process(context: any, params: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

}