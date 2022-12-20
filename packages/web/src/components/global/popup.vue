<template>
	<Transition :name="$style.fade">
		<div :class="$style.container" v-if="modelValue">
			<div :class="$style.bg" @click="$emit('update:modelValue', false)"></div>
			<div :class="$style.popup">
				<slot />
			</div>
		</div>
	</Transition>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (event: 'update:modelValue', payload: boolean): void }>();

onMounted(() => {
	window.addEventListener("keydown", close);
});
onBeforeUnmount(() => {
	window.removeEventListener("keydown", close);
});

function close(event: KeyboardEvent) {
	if (event.key === "Escape") {
		emit('update:modelValue', false);
	}
}
</script>

<style module lang="scss">
.container {
	display: flex;
	justify-content: center;
	align-items: center;

	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
}

.bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba($color: #000000, $alpha: 0.7);
	z-index: -1;
}

.fade {
	&:global(-enter-active),
	&:global(-leave-active) {
		transition: opacity 0.2s ease 0s;
		.popup {
			transition: transform 0.3s ease 0s, opacity 0.2s ease 0s;
		}
	}
	&:global(-leave-active) {
		.popup {
			transition: transform 0.2s ease 0s, opacity 0.2s ease 0s;
		}
	}
	&:global(-enter-from),
	&:global(-leave-to) {
		opacity: 0;
		.popup {
			transform: scale(0.95);
			opacity: 0;
		}
	}
}
</style>
