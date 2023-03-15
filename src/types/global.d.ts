import type { FormTemplate, FormSubmitData } from "@/types/types";

declare module "*.module.css";
declare module "*.module.scss";

declare global {
    interface Window {
        AhaForm?: any;
        AhaFormTemplate?: {
            [key: string]: FormTemplate;
        };
        AhaFormSubmitCallback?: (formData: FormSubmitData) => void;
    }
}
