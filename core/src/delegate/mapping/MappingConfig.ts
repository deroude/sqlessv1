import { DelegateConfig } from "../DelegateConfig";

export interface FieldMapping {
    from: string;
    to: string;
}

export interface ObjectMappingConfig extends DelegateConfig {
    fields: FieldMapping[];
}