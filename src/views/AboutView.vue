<template>
  <div class="about">
    <component :is="remoteDemoCom" name="嘻嘻嘻" @update:name="handleName" />
    <component :is="remoteImgCom" />
    <!-- <Image /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { getComponent } from '@/utils';

const remoteImgCom = shallowRef()
const remoteDemoCom = shallowRef()

const init = async () => {
  // const demo = await getComponent('https://web.my91app.com/web/remote-components/Demo.vue');
  remoteImgCom.value = await getComponent('https://web.my91app.com/web/remote-components/Image.vue');
  remoteDemoCom.value = await getComponent('https://web.my91app.com/web/remote-components/Demo.vue');
  console.log(remoteImgCom.value);
}
init()

const handleName = (name: string) => {
  console.log(name);
}
</script>
<style>
</style>
