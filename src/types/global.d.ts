import type { FormTemplate, FormSubmitData } from "@/types/types";

declare module "*.module.css";
declare module "*.module.scss";

declare global {
    interface Window {
        AHAForm?: any;
        AHAFormTemplate?: {
            [key: string]: FormTemplate;
        };
        AHAFormSubmitCallback?: (formData: FormSubmitData) => void;
    }
}
