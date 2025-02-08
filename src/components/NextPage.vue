<template>
  <div class="next-page-wrapper">
    <!-- 插槽用于外部内容渲染 -->
    <div @click="openDrawer">
      <slot>
        <van-button type="primary">主要按钮</van-button>
      </slot>
    </div>

    <!-- 抽屉式页面 -->
    <div class="drawer-page" :class="{ 'drawer-open': isOpen }">
      <div class="drawer-header">
        <svg
          @click="closeDrawer"
          t="1738805878757"
          class="icon back-icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4178"
          width="48"
          height="48"
        >
          <path
            d="M595.3 945.9c-13.9 0-27.3-5.5-37.2-15.4l-383.5-382c-20.5-20.5-20.5-53.6 0-74.1L558.1 92.3c20.6-20.2 53.7-20 74.1 0.3 20.4 20.4 20.5 53.3 0.3 73.8l-346.2 345 346.3 345.1c15 15 19.5 37.5 11.4 57.1-8.3 19.5-27.4 32.3-48.7 32.3z"
            p-id="4179"
          ></path>
        </svg>
        <div class="title">{{ title }}</div>
        <!-- <button class="close-btn" >×</button> -->
      </div>
      <div class="drawer-content">
        <!-- 远程组件将在这里加载 -->
        <component v-if="isOpen" :is="remoteComponent" v-bind="$attrs"></component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
// import { loadModule } from 'vue3-sfc-loader';
import * as Vue from 'vue';
// @ts-ignore
const { loadModule } = window['vue3-sfc-loader'];


defineOptions({
  name: 'NextPage',
});
const props = withDefaults(
  defineProps<{
    src: string;
    title: string;
  }>(),
  {
    src: 'http://oss.lijiayuan.top/project/vue-remote-components/Image.vue',
    title: '标题',
  }
);

const isOpen = ref(false);
const remoteComponent = shallowRef();
const getComponent = async (componentUrl: string) => {
  try {
    const component = await loadModule(componentUrl, {
      moduleCache: {
        vue: Vue,
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
const openDrawer = async () => {
  isOpen.value = true;
  remoteComponent.value = await getComponent(props.src);
};

const closeDrawer = () => {
  isOpen.value = false;
};
</script>

<style scoped>
.next-page-wrapper {
  position: relative;
}

.drawer-page {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100vh;
  background: white;
  transition: right 0.3s ease;
  z-index: 1000;
}

.drawer-open {
  right: 0;
}

.drawer-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* justify-content: space-between; */
  /* padding: 16px; */
  padding: 16px 0;
  /* border-bottom: 1px solid #eee; */
}

.back-icon {
  position: absolute;
  left: 16px;
}

.title {
  font-size: 36px;
  font-weight: bold;
  color: #333;
}

/* .close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  float: right;
} */

/* .drawer-content {
  padding: 20px;
}

@media (min-width: 768px) {
  .drawer-page {
    width: 50%;
  }
} */
</style>
