<template>
	<img v-if="noAsset" src="./assets/default_honor.svg" />
	<img v-else ref="el" :src="src" />
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";

const props = defineProps<{ src?: string }>();
const el = ref<HTMLImageElement>();
const loading = ref(true);
const loaded = ref(false);
const noAsset = computed(() => !props.src || (!loading.value && !loaded.value));

watch(() => props.src, () => {
	loading.value = true;
	loaded.value = false;
});

onMounted(() => {
	if (!el.value) return;
	el.value.onload = () => {
		loading.value = false;
		loaded.value = true;
	};
	el.value.onerror = () => {
		loading.value = false;
		loaded.value = false;
	};
});
</script>
