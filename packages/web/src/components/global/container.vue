<template>
	<div class="container">
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
defineProps({
	width: {
		type: String,
		default: '1184px',
	},
});
</script>

<style lang="scss" scoped>
.container {
	padding-left: calc((100% - v-bind(width)) / 2);
	padding-right: calc((100% - v-bind(width)) / 2);

	&.home {
		// background: url("/src/pages/home/assets/bg_container-home.png") no-repeat top
		// 		460px center,
		// 	url("/src/pages/home/assets/bg_container-home2.png") no-repeat right bottom;
		padding-bottom: 60px;
	}
}
</style>
