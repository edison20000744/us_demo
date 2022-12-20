<template>
  <router-view></router-view>
</template>
<script lang="ts" setup>
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
  /* overflow: hidden; */
}

a {
  text-decoration: none;
  color: unset;
}

#app {
  font-family: "Noto Sans TC", "Noto Sans SC", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
</style>
