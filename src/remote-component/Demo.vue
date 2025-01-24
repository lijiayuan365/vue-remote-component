<template>
  <div class="demo">
    <h1>Hello {{ name }}</h1>
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
