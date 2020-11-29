import { DelegateConfig } from "../DelegateConfig";

export interface QueryConfig extends DelegateConfig {
    statement: string;
    params?: any[];
    type: 'row' | 'scalar' | 'set';
    assign?: string
}
