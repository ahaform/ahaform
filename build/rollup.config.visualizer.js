import { visualizer } from 'rollup-plugin-visualizer';
import getBaseConfig from './rollup.config.base';

const devConfig = commandLineArgs => getBaseConfig(commandLineArgs).map(config => {
    config.plugins.push(visualizer({
        open: true,
        sourcemap: true,
        gzipSize: true
    }));
    return config;
});
export default devConfig;
