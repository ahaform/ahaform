export interface FormStep {
    stepID: string;
}

export interface FormTemplate {
    template: string;
    style: string;
    script: string;
}

export interface FormSubmitData {
    templateId: string;
    [key: string]: any;
}

export interface FormOptions {
    template: FormTemplate;
    submitResolve?: (res: FormSubmitData) => void;
    submitReject?: (err: any) => void;
}
