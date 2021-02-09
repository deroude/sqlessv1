import { Delegate } from "../Delegate";
import { MailDelegateConfig } from "./MailDelegateConfig";
import { Mailgun, messages } from 'mailgun-js';
import _ from 'lodash';

export class MailDelegate implements Delegate {

    constructor(private config: MailDelegateConfig) { }

    async process(context: any, params: any): Promise<void> {
        try {
            const recipients = _.get(params, this.config.recipientsVar) as any[];
            const recipientVars: messages.BatchSendRecipientVars = recipients.reduce(
                (acc, curr) => {
                    acc[curr.email] = curr;
                    return acc;
                }, {}
            );
            (context.mail as Mailgun).messages().send({
                from: 'order@mark-masons.ro',
                template: _.get(params, this.config.templateVar),
                to: recipients.map(r => r.email),
                'recipient-variables': recipientVars
            } as messages.BatchData);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }

}