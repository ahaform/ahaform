import Template from "@/template/template";

export default class SurveyTemplate extends Template {

    constructor(options: Options) {
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
            import('https://ecstatic.ptengine.com/ecp/1b35d857-3f52-4d6e-911c-70e4a6062481/app/03fa9de5-679b-4273-b282-0626dd798370/0.1.0/bundle.js').then(r=>{
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
