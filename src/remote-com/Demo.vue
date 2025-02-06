<template>
  <div class="demo">
    <h1>Hello {{ name }}</h1>
    <van-button type="primary" @click="handleClick">主要按钮</van-button>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  name: {
    type: String,
    required: true,
    default: 'World',
  },
}>()

const emit = defineEmits(['update:name'])

const handleClick = () => {
  emit('update:name', 'John')
}
</script>
<style scoped>
.demo {
  width: 375px;
  background-color: red;
}
h1 {
  /* color: red; */
}
</style>
