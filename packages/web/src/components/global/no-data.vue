<template>
	<div class="no_data" :type="type">
		<img v-if="type === 'no-match'" src="./assets/img_noGame.png" />
		<span>
			<slot>{{ t.f_text_00213 }}</slot>
		</span>
	</div>
</template>
<script lang="ts" setup>
import { PropType } from "vue";
import { useI18n } from '@us/locales/us';
const t = useI18n();
defineProps({
	type: { type: String as PropType<typeof types[number]>, default: 'default' },
});
</script>
<script lang="ts">
export const types = [
	"default",
	"border-radius",
	"no-match",
	"no-bg",
	"no-bg-top",
	"pc",
	"500h",
] as const;
</script>
<style lang="scss" scoped>
.no_data[type="default"] {
	padding: 15px;
	background-color: #fdfdfd;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: mobile_number(48px);
}

.no_data[type="border-radius"] {
	@extend [type="default"];
	margin: 20px 0 0;
	border-radius: 13.125px;
	box-shadow: 0 0 5.8333333333px 0 rgb(122 125 165 / 40%);
}

.no_data[type="no-match"] {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #f4f4f4;
	height: 100%;

	img {
		width: 160px;
		height: 85px;
		margin: 0 0 20px;
		object-fit: contain;
		opacity: 0.65;
		margin-top: 40px;
	}

	span {
		font-size: 13px;
		font-weight: 500;
		line-height: 1.46;
		color: #505155;
	}
}

.no_data[type="no-bg"] {
	@extend [type="default"];
	background-color: unset;
	height: 100%;
	flex: 1;
}

.no_data[type="no-bg-top"] {
	@extend [type="no-bg"];
	flex-direction: column;
	justify-content: flex-start;
}

.no_data[type="pc"] {
	min-height: 200px;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
}

.no_data[type="500h"] {
	@extend [type="pc"];
	height: 500px;
}
</style>
