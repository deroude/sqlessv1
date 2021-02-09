import { DelegateConfig } from "../DelegateConfig";

export interface MailDelegateConfig extends DelegateConfig {
    templateVar: string;
    recipientsVar: string;
}