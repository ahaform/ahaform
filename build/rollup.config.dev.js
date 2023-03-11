import getBaseConfig from './rollup.config.base';

export default commandLineArgs => {
    const devConfig = getBaseConfig(commandLineArgs).map(config => {
        if (config.output) {
            if (Array.isArray(config.output)) {
                config.output.forEach(o => (o.sourcemap = true));
            } else {
                config.output.sourcemap = true;
            }
        }
        return config;
    });
    return devConfig;
};
