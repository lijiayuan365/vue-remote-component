import * as Vue from 'vue';
import * as Lodash from 'lodash-es'

// @ts-ignore
const { loadModule } = window['vue3-sfc-loader'];
const getComponent = async (componentUrl: string) => {
  try {
    const component = await loadModule(componentUrl, {
      moduleCache: {
        vue: Vue,
        'lodash-es': Lodash,
      },
      async getFile(url: string) {
        const res = await fetch(url);
        // debugger
        const code = await res.text();
        return code;
      },
      addStyle(textContent: string) {
        const style = Object.assign(document.createElement('style'), {
          textContent,
        });
        const ref = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, ref);
      },
      // getPathname: (url: string) => url,
      // pathResolve: (pathCx: { refPath: string }, relPath: string) => relPath,
      // isCustomElement: (tag: string) => false,
      // createCJSModule: (text: string) => ({ exports: {} }),
    });
    if (!component) {
      throw new Error('Component failed to load');
    }
    return component;
  } catch (error) {
    console.error('Failed to load remote component:', error);
    throw error;
  }
};

export { getComponent };