import { DelegateConfig } from "../DelegateConfig";

export interface AssertConfig extends DelegateConfig {
    truthyParam: string;
    failResponseCode: number;
    failResponseMessage: string;
}