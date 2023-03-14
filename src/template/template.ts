import { uuid } from "../utils/uuid";

export default class Template {
    public templateId: string;
    public template: string;
    public style: string;
    public script: string;
    public options: any;

    constructor(options: any) {
        this.templateId = uuid();
        this.options = options;

        if (!options) {
            throw new Error("Template options required!");
        }

        this.template = this._getTemplate();
        this.style = this._getStyle();
        this.script = this._getScript();
    }

    _getTemplate(): string {
        throw new Error("Template html is required!");
    }

    _getStyle(): string {
        throw new Error("Template style is required!");
    }

    _getScript(): string {
        throw new Error("Template script is required!");
    }
}
