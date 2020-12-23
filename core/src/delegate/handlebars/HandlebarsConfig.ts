import { DelegateConfig } from "../DelegateConfig";

export interface HandlebarsConfig extends DelegateConfig {
    templateVar: string;
    paramVars?: { [k: string]: string };
    assign: string
}