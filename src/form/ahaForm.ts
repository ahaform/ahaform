import type { FormOptions, FormSubmitData } from "@/types/types";

import { generateNode } from "@/utils/node";
import { addEvent } from "@/utils/browser";

export default class AHAForm {
    private target: HTMLElement;
    private options: FormOptions;
    private frame: HTMLIFrameElement;

    constructor(el: HTMLElement | string, options: FormOptions) {
        this.target = (
            typeof el === "string" ? document.querySelector(el) : el
        ) as HTMLElement;
        this.options = options;
        this.frame = this._getFrameNode();

        if (!this.target) {
            throw new Error("ahaForm target element is required!");
        }
    }

    private _getFrameNode(): HTMLIFrameElement {
        return generateNode(
            `<iframe frameborder="0" width="100%" height="100%">`
        ) as HTMLIFrameElement;
    }

    private _getFrameHTML(): string {
        const { template, style, script } = this.options.template;
        return `<!DOCTYPE html>
        <html aha-form>
            <head>
                <title>AHA Form</title>
                <style>
                    html, body {
                        width: 100%;
                        height: 100%;
                        margin: 0;
                        padding: 0;
                        overflow: hidden;
                    }
                    ${style}
                </style>
            </head>
            <body style="background-color:transparent">
                ${template}
                <script>
                    ${script}
                </script>
            </body>
        </html>`;
    }

    private _replaceIframe(): void {
        const contentDocument =
            this.frame?.contentDocument || this.frame?.contentWindow?.document;
        if (contentDocument) {
            contentDocument.open();
            contentDocument.write(this._getFrameHTML());
            contentDocument.close();
        }
    }

    private _handleFrameLoad(): void {
        const frameHeight = this.frame.contentDocument?.body.scrollHeight;
        this.frame.style.height = frameHeight + "px";

        this.frame.contentWindow &&
            (this.frame.contentWindow.AHAFormSubmitCallback = (
                res: FormSubmitData
            ): void => {
                this._handleSubmit(res);
            });
    }

    private _handleFrameResize(): void {
        console.log("frame resize");
    }

    private _handleSubmit(formData: FormSubmitData): void {
        if (typeof this.options.submitResolve === "function") {
            this.options.submitResolve(formData);
        }
    }

    public init(): void {
        addEvent(this.frame, "load", () => this._handleFrameLoad(), false);
        this.frame.contentWindow &&
            addEvent(
                this.frame.contentWindow,
                "resize",
                () => this._handleFrameResize(),
                false
            );

        this.target.appendChild(this.frame);
        this._replaceIframe();

        console.log(this.target, this.options);
    }
}
