import Template from "@/template/template";
import templateStyles from "./style.css";

interface Options {
    title: string;
    desc: string;
    img: string;
    question: string;
    stepIndex?: number;
    stepCount: number;
}

export default class VivaiaTemplate extends Template {

    constructor(options: Options) {
        super(options);

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
                AhaFormSubmitCallback({
                    templateId,
                    res: e.value
                })
            }
        `;
    }
}
