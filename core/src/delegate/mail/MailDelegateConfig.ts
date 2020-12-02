import { DelegateConfig } from "../DelegateConfig";

export interface MailDelegateConfig extends DelegateConfig {
    params: string[];
    template: string;
}