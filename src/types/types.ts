export type FormOptionType = 'text' | 'range' | 'select' | 'color' | 'image';

export type ValidationType = 'required' |'email' | 'none';

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

export interface FormOptionSchema {
    type: FormOptionType;
    name: string;
    label: string;
    validation: ValidationType;
    value?: string | number;
}

export interface FormSchema {
    [key: string]: FormOptionSchema
}
