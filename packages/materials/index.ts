import type { Plugin, App } from "vue";

import components  from "./components";

const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    components.forEach((component) => app.use(component));
  };

  return {
    install,
  };
};

export default makeInstaller(components);
