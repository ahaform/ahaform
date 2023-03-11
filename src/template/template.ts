export default class Template {
    public templateId: string;
    public template: string;
    public style: string;
    public script: string;

    constructor() {
        this.templateId = "";
        this.template = "";
        this.style = "";
        this.script = "";
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
