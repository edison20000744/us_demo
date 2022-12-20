<template>
	<div :class="{ scrollbar: scrollbarFlag }">
		<slot></slot>
	</div>
</template>
<script lang="ts" setup>
import { isMobile } from 'mobile-device-detect';

defineProps({ scrollbarFlag: { type: Boolean, required: false, default: true } });

const overflow = isMobile ? 'overlay' : 'hidden';
const bg = isMobile ? 'transparent' : 'rgba(0, 0, 0, 0.1)';
</script>

<style lang="scss" scoped>
.scrollbar {
	overflow: v-bind(overflow);

	&:hover {
		overflow: overlay;
	}
	&::-webkit-scrollbar {
		width: 5px;
		height: 5px;
	}
	&::-webkit-scrollbar-thumb {
		background: v-bind(bg);
		border-radius: 2.5px;
		transition: all 0.5s;

		&:hover {
			background: rgba(0, 0, 0, 0.2);
		}
	}
}
</style>
