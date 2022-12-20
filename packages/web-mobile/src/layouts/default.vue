<template>
  <div id="us-mobile">
    <Header v-show="!route.meta.headerHide"></Header>
    <Side></Side>
    <div class="main_container" ref="container">
      <RouterView #="{ Component }">
        <Suspense>
          <template #default>
            <component :is="Component" style="z-index: 0; flex: 1"></component>
          </template>
          <template #fallback>
            <UsLoading></UsLoading>
          </template>
        </Suspense>
      </RouterView>
    </div>
    <Footer v-show="!route.meta.footerHide"></Footer>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import { useSettings } from '@us/utils';
import Header from "../components/header/index.vue";
import Side from "../components/side/index.vue";
import Footer from "../components/footer/index.vue";

const route = useRoute();
const router = useRouter();
const settings = useSettings();
const container = ref<HTMLElement>();
router.afterEach((to, from) => {
  container.value?.scroll({ top: 0 })
  //語系切換時，則刷新頁面避免緩存的問題
  if (from.name === 'settings' && settings.languageChange) {
    settings.languageChange = false
    router.go(0)
  }
})

</script>
<style lang="scss" scoped>
.main_container {
  flex: 1;
  overflow: auto;
}
#us-mobile {
  background: #f4f7fc;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
