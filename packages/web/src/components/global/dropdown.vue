<template>
	<div
		ref="dropdown"
		:class="$style.dropdown"
		@mouseenter="hover = true"
		@mouseleave="hover = false"
		@click="() => { if (mode === 'click') { show = !show } }"
	>
		<slot :active="show"></slot>

		<transition :name="$style.popup">
			<div :class="$style.popup" :style="dropdownStyle" v-if="show" @click="e => e.stopPropagation()">
				<slot name="dropdown" @close="show = false"></slot>
			</div>
		</transition>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { onClickOutside } from '@vueuse/core';

const props = withDefaults(defineProps<{
	mode?: 'hover' | 'click'
	dropdownStyle?: string,
}>(), {
	mode: 'hover'
});

const dropdown = ref<HTMLElement>();
const route = useRoute();
const hover = ref(false);
const show = ref(false);

watch(
	() => route.fullPath,
	() => show.value = false,
	{ immediate: true },
);

if (props.mode === 'click') {
	onClickOutside(dropdown, () => {
		show.value = false;
	});
}
else if (props.mode === 'hover') {
	watch(
		() => hover.value,
		() => {
			if (!hover.value) {
				setTimeout(() => {
					if (!hover.value) {
						show.value = false;
					}
				}, 150);
			}
			else {
				setTimeout(() => {
					if (hover.value) {
						show.value = true;
					}
				}, 250);
			}
		},
		{ immediate: true },
	);
}
</script>

<style module lang="scss">
.dropdown {
	display: inline-block;
	position: relative;

	.popup {
		top: 100%;
		position: absolute;
		transform-origin: top;
		z-index: 1000;

		&:global(-enter-active),
		&:global(-leave-active) {
			transition: all 0.2s;
		}
		&:global(-enter-from),
		&:global(-leave-to) {
			transform: scaleY(0.5);
			opacity: 0;
		}
	}
}
</style>
