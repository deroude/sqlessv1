import { DelegateConfig } from "./DelegateConfig";

export interface Delegate {
    process(context: any, params: any): Promise<void>;
}

export interface MethodDelegate {
    pipe: Delegate[];
    returnVar?: string;
}