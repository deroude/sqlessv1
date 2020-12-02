import { DelegateConfig } from "../DelegateConfig";

export interface QueryConfig extends DelegateConfig {
    statement: string;
    params?: any[];
    resultType: 'row' | 'scalar' | 'set' | 'none';
    assign?: string
}
