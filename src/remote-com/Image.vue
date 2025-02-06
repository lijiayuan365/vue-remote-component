<template>
  <div class="image-component">
    <img :src="src" alt="image" class="image" />
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string;
  }>(),
  {
    src: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
  }
);
</script>
<style scoped>
.image {
  width: 750px;
  height: 400px;
  object-fit: cover;
}
</style>
