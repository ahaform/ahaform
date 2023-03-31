import Template from "@/template/template";

export default class SurveyTemplate extends Template {

    constructor(options: unknown) {
        super(options);

    }

    _getTemplate(): string {
        return `
            <div id='ahaApp'>loading</div>
        `;
    }

    _getStyle(): string {
       return "";
    }

    _getScript(): string {
        return `
            import('https://ecstatic.ptengine.com/sdk/ahaform/bundle.js').then(r=>{
                const { loadApp } = r;
                const app = loadApp({ options:${JSON.stringify(this.options)}});
                app.mount(document.querySelector('#ahaApp'));

                app.on('answer',(data)=>{
                    console.log(data);
                    AhaFormSubmitCallback({
                        ...data
                    });
                });
                app.on('submit',(data)=>{
                    console.log('submit',data);
                    AhaFormSubmitCallback({
                        ...data
                    });
                })
            })
        `;
    }
}
