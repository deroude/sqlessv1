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
import { HtmlPdfDelegate } from "./html-pdf/HtmlPdfDelegate";
import { HtmlPdfConfig } from "./html-pdf/HtmlPdfConfig";
import { HandlebarsDelegate } from "./handlebars/HandlebarsDelegate";
import { HandlebarsConfig } from "./handlebars/HandlebarsConfig";
import { AssertConfig } from "./assert/AssertConfig";
import { AssertDelegate } from "./assert/AssertDelegate";
import { StubConfig } from "./stub/StubConfig";
import { StubDelegate } from "./stub/StubDelegate";

export interface DelegateConfig {
    type: string;
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
        case 'html-pdf':
            return new HtmlPdfDelegate(config as HtmlPdfConfig);
        case 'handlebars':
            return new HandlebarsDelegate(config as HandlebarsConfig);
        case 'assert':
            return new AssertDelegate(config as AssertConfig);
        case 'stub':
            return new StubDelegate(config as StubConfig);
        default:
            return new NotImplementedDelegate();
    }
}