import { terser } from 'rollup-plugin-terser'; // 压缩ES6+
import getBaseConfig from './rollup.config.base';

export default commandLineArgs => {
    const prodConfig = getBaseConfig(commandLineArgs).map(config => {
        const { plugins } = config;
        plugins?.push(terser({
            compress: {
                pure_funcs: ['console.log', 'console.warn']
            }
        }));
        return config;
    });
    return prodConfig;
};

