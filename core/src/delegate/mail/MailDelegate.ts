import { Delegate } from "../Delegate";
import { MailDelegateConfig } from "./MailDelegateConfig";
import mailgun, { Mailgun, messages } from 'mailgun-js';

export class MailDelegate implements Delegate {

    mg: Mailgun;

    constructor(private config: MailDelegateConfig) {
        this.mg = mailgun({ apiKey: this.config.mailGunApiKey, domain: this.config.mailGunDomain })
    }

    async process(context: any, params: any): Promise<void> {
        try {
            this.mg.messages().send({ 'recipient-variables': params as messages.BatchSendRecipientVars } as messages.BatchData);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }

}