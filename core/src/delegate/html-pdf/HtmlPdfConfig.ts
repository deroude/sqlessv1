import { CreateOptions } from "html-pdf";
import { DelegateConfig } from "../DelegateConfig";

export interface HtmlPdfConfig extends DelegateConfig {
    sourceVar: string;
    assign: string;
    options: CreateOptions;
}