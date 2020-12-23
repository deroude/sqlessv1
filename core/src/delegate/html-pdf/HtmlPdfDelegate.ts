import { Delegate } from "../Delegate";
import { HtmlPdfConfig } from "./HtmlPdfConfig";
import pdf, { CreateOptions } from "html-pdf";

export class HtmlPdfDelegate implements Delegate {

    constructor(private config: HtmlPdfConfig) { }

    async process(context: any, params: any): Promise<void> {
        return new Promise((resolve, reject) => {

            pdf.create(params[this.config.sourceVar], this.config.options).toBuffer((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    params[this.config.assign] = res;
                    resolve();
                }
            });
        })
    }
}