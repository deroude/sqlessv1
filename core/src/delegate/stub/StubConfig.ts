import { DelegateConfig } from "../DelegateConfig";

export interface StubConfig extends DelegateConfig {
    payload: any;
    assign: string;
}