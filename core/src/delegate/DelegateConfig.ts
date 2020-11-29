import { CustomConfig } from "./custom/CustomConfig";
import { CustomDelegate } from "./custom/CustomDelegate";
import { Delegate } from "./Delegate";
import { MailDelegate } from "./mail/MailDelegate";
import { ObjectMappingConfig } from "./mapping/MappingConfig";
import { MappingDelegate } from "./mapping/MappingDelegate";
import { QueryConfig } from "./persistence/QueryConfig";
import { QueryDelegate } from "./persistence/QueryDelegate";
import { MailDelegateConfig } from "./mail/MailDelegateConfig";
import { NotImplementedDelegate } from "./not-implemented/NotImplementedDelegate";

export interface DelegateConfig {
    type: string;
}

export interface MethodDelegateConfig {
    pipe: DelegateConfig[];
    returnVar: string;
}

export const loadDelegate = (config: DelegateConfig): Delegate => {
    switch (config.type) {
        case 'query':
            return new QueryDelegate(config as QueryConfig);
        case 'mapping':
            return new MappingDelegate(config as ObjectMappingConfig);
        case 'custom':
            return new CustomDelegate(config as CustomConfig);
        case 'mail':
            return new MailDelegate(config as MailDelegateConfig);
        default:
            return new NotImplementedDelegate();
    }
}