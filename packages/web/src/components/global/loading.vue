<template>
	<div :class="$style.container" v-if="type === 'default'">
		<lottie-player src="/lf20_waeevdp3.json" background="transparent" speed="1" style="width: 200px; height: 200px;"
			loop autoplay></lottie-player>
	</div>
	<lottie-player v-else-if="type === 'small'" src="/lf20_ie7fafpr.json" background="transparent" speed="1"
		style="width: 16px; height: 16px;" loop autoplay></lottie-player>
</template>
<script lang="ts" setup>
const props = withDefaults(defineProps<{
	type?: 'default' | 'small'
}>(), {
	type: 'default'
});
</script>

<style module lang="scss">
.container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
