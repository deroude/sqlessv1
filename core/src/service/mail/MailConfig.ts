import { DelegateConfig } from "../../delegate/DelegateConfig";

export interface MailConfig {
    smtp?: {
        uri?: string;
        host?: string;
        username?: string;
        password?: string;
        port?: number;
        secure?: boolean;
    }
    defaultSender?: string;
    mailGun? : {
        apiKey: string;
        domain: string;
    }
}