<template>
  <div :class="settings.language">
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup>
import { watch } from 'vue';
import { useSettings } from '@us/utils';
import { useI18n } from '@us/locales/tg';
const settings = useSettings();
const t = useI18n();
// First we get the viewport height and we multiple it by 1 % to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the--vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

watch(() => t.web_tg_title, () => {
  document.title = t.web_tg_title;
}, { immediate: true })
</script>
<style lang="scss">
@import "@us/web-tg/asset/scss/common";

#app {
  font-family: "Noto Sans TC", "Noto Sans SC", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f4f7fc;
}

body {
  margin: 0;
}
</style>
