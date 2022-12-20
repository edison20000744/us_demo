<template>
	<div class="slider" :type="type">
		<button class="arrow-l" @click="move(-moveDistance)" :disabled="left >= 0"></button>
		<button class="arrow-r" @click="move(moveDistance)" :disabled="right <= 0"></button>
		<div class="list-wrap" ref="parent">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { computed, ref, watch } from 'vue';
import { useWindowSize } from '@vueuse/core';

defineProps({
	type: { type: String as PropType<typeof types[number]>, default: 'default' },
	moveDistance: { type: Number, default: 500 },
});
const parent = ref<HTMLElement>();
const child = computed(() => {
	if (parent.value?.children.length) {
		return parent.value.children[0];
	}
});
const left = ref(0);
const right = ref(0);
const { width: windowWidth } = useWindowSize();

watch(parent, () => {
	parent.value?.addEventListener('scroll', updateLeftRight);
}, { immediate: true });
watch([parent, child, windowWidth], updateLeftRight, { immediate: true });

function move(offset: number) {
	parent.value?.scrollBy({ left: offset, behavior: 'smooth' });
}
function updateLeftRight() {
	if (parent.value && child.value) {
		const parentRect = parent.value.getBoundingClientRect();
		const childRect = child.value.getBoundingClientRect();
		left.value = childRect.left - parentRect.left;
		right.value = childRect.right - parentRect.right;
	}
}
</script>
<script lang="ts">
export const types = [
	'default',
	'analysis-mobile',
] as const;
</script>
<style lang="scss" scoped>
.slider[type="default"] {
	position: relative;

	.arrow-r {
		background-color: transparent;
		border: none;
		cursor: pointer;

		position: absolute;
		left: calc(100% + 8px);
		top: 50%;
		transform: translateY(-50%);

		&:before {
			content: "";
			width: 22px;
			height: 55px;
			background-image: url(./assets/icon_slider_arrow.svg);
			display: inline-block;
		}
	}
	.arrow-r[disabled] {
		cursor: unset;

		&:before {
			background-image: url(./assets/icon_slider_arrow_disabled.svg);
		}
	}
	.arrow-l {
		@extend .arrow-r;
		left: unset;
		right: calc(100% + 8px);

		&:before {
			transform: scaleX(-1);
		}
	}
	.list-wrap {
		overflow-x: auto;
	}
}

.slider[type="analysis-mobile"] {
	@extend [type="default"];
	.arrow-r {
		left: calc(100% - 5px);
		right: unset;
		&:before {
			width: 24px;
			height: 24px;
			background-image: url(./assets/ic_doubleAngle-right_Pr.svg);
		}
	}
	.arrow-r[disabled] {
		cursor: unset;
		&:before {
			background-image: unset;
		}
	}
	.arrow-l {
		left: unset;
		right: calc(100% - 5px);
		&:before {
			transform: scaleX(-1);
		}
	}
	.list-wrap {
		overflow-y: auto;
	}
}
</style>
