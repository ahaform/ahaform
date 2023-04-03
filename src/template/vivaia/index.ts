import Template from "@/template/template";
import { uuid} from "@/utils/uuid";
import templateStyles from "./style.css";
import { FormSchema } from '@/types/types';

interface Options {
    title: string;
    desc: string;
    img: string;
    question: string;
    stepIndex?: number;
    stepCount: number;
}

export default class VIVAIATemplate extends Template {
    public options: Options;

    constructor(options: Options) {
        super();
        this.templateId = uuid();
        this.options = options;

        if (!options) {
            throw new Error("Template options required!");
        }

        this.template = this._getTemplate();
        this.style = this._getStyle();
        this.script = this._getScript();
        this.schema = this._getSchema();
    }

    _getTemplate(): string {
        return `
            <div class="vivaia">
                <header>
                    <h3>${this.options.title}</h3>
                    <p>${this.options.desc}</p>
                </header>
                <ul>
                    <li class="active">1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
                <section>
                    <h4>${this.options.question}</h4>
                    <img src="${this.options.img}">

                    <footer>
                        <label>
                            <input type="radio" name="question" value="yes" checked onchange="handleChange(this)">
                            <span>是</span>
                        </label>
                        <label>
                            <input type="radio" name="question" value="no" onchange="handleChange(this)">
                            <span>否</span>
                        </label>
                    </footer>
                </section>
            </div>
        `;
    }

    _getStyle(): string {
        console.log("xxxx");
        return templateStyles;
    }

    _getScript(): string {
        return `
            const templateId = "${this.templateId}";

            function handleChange(e){
                AHAFormSubmitCallback({
                    templateId,
                    res: e.value
                })
            }
        `;
    }

    _getSchema(): FormSchema {
        return {
            title: {
                type: 'text',
                name: 'title',
                label: 'Title',
                validation: 'required'
            },
            desc: {
                type: 'text',
                name: 'desc',
                label: 'Desc',
                validation: 'required'
            },
            img: {
                type: 'image',
                name: 'image',
                label: 'Image',
                validation: 'required',
                value: ''
            },
            question: {
                type: 'text',
                name: 'desc',
                label: 'Question',
                validation: 'required'
            },
            stepIndex: {
                type: 'text',
                name: 'stepIndex',
                label: 'Step Index',
                validation: 'required'
            },
            stepCount: {
                type: 'text',
                name: 'stepCount',
                label: 'Step Count',
                validation: 'required',
                value: 3
            }
        };
    }
}
