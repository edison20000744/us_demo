<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { watch } from 'vue';
import { useI18n } from '@us/locales/us';

const t = useI18n();

watch(() => t.f_text_00664, () => {
  document.title = t.f_text_00664;
}, { immediate: true })
</script>
<style>
html,
body {
  width: 100vw;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Noto Sans TC", "Noto Sans SC", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: linear-gradient(90deg,
      #f7f8fa 0%,
      #ffffff 50%,
      #f7f8fa 100%);
  width: 100%;
  height: 100%;
}

a {
  text-decoration: none;
  color: unset;
}
</style>
