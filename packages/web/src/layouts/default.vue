<template>
	<Pc v-if="platform === 'desktop'"></Pc>
	<Mobile v-else></Mobile>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';
import { usePlatform } from '@us/utils';

const Pc = defineAsyncComponent(() => import('./default-pc.vue'));
const Mobile = defineAsyncComponent(() => import('@us/web-mobile/layouts/default.vue'));
const platform = usePlatform();
</script>
