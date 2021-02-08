import { DelegateConfig } from "../DelegateConfig";

export interface MailDelegateConfig extends DelegateConfig {
    mailGunApiKey: string;
    mailGunDomain: string;
    template: string;
}