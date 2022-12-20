<template>
	<label class="range" :type="type">
		<span class="start" v-if="showStart">{{ startValue }}</span>
		<input
			type="range"
			:min="min"
			:max="max"
			:step="step"
			v-model.number="modelValueProxy"
			:data-currentValue="currentValue"
		/>
		<span class="end">{{ endValue }}</span>
	</label>
</template>
<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import type { PropType } from 'vue';
const props = defineProps({
	type: { type: String as PropType<typeof types[number]>, default: 'default' },
	min: { type: Number, default: 0 },
	max: { type: Number, default: 100 },
	step: { type: Number, default: 25 },
	modelValue: { type: [Number] as PropType<number>, required: true },
});
const emit = defineEmits<{
	(event: 'update:modelValue', payload?: string | number | string[]): void
}>();

const modelValueProxy = ref(props.modelValue);
const showStart = computed(() => {
	return ['gameList-mobile-filter'].includes(props.type);
})
watch(() => props.modelValue, () => {
	modelValueProxy.value = props.modelValue;
});
watch(modelValueProxy, () => {
	emit("update:modelValue", modelValueProxy.value);
});
const unit = computed(() => {
	let text = '';
	switch (props.type) {
		case 'gameList-mobile-filter':
			text = '%'
			break;
		default:
			break;
	}
	return text;
})
const startValue = computed(() => `${props.min}${unit.value}`)
const endValue = computed(() => {
	let text = '';
	switch (props.type) {
		case 'gameList-mobile-filter':
			text = `${props.max}${unit.value}`
			break;
		default:
			text = currentValue.value
			break;
	}
	return text;

})
const currentValue = computed(() => `${props.modelValue || 0}${unit.value}`);
const progress = computed(() => (props.modelValue / props.max * 100) + '%');
</script>
<script lang="ts">
export const types = [
	'default',
	'gameList-mobile-filter',
] as const;
</script>
<style lang="scss" scoped>
$inputWidth: 200;
$spreadRadius: 8;
@function getProgress($inputWidth, $radius, $color) {
	$val: -5px 0 0 -10px $color;
	@for $i from 6 through $inputWidth {
		$val: #{$val}, -#{$i}px 0 0 -#{$radius}px #{$color};
	}
	@return $val;
}
.range[type="default"] {
	/* input range 主體樣式 */
	input[type="range"] {
		margin: auto;
		-webkit-appearance: none;
		outline: none;
		overflow: hidden;
		height: 20px;
		width: #{$inputWidth}px;
		cursor: pointer;
		border-radius: 0;
		/* 滑動軌道 樣式 */
		&::-webkit-slider-runnable-track {
			background: #ddd;
			height: 4px;
		}
		/* 滑動鈕 樣式 */
		&::-webkit-slider-thumb {
			margin-top: -8px;
			-webkit-appearance: none;
			width: 20px;
			height: 20px;
			background: #fff;
			box-shadow: getProgress($inputWidth, $spreadRadius, #a87a44);
			border: 2px solid #999;
			border-radius: 50%;
			// transform: translatex(2px)
		}
	}
}
.range[type="gameList-mobile-filter"] {
	display: grid;
	grid-template-columns: auto auto 1fr;
	align-items: center;
	gap: 23px;
	input[type="range"] {
		position: relative;
		margin: auto;
		-webkit-appearance: none;
		outline: none;
		height: 120px;
		width: #{$inputWidth}px;
		cursor: pointer;
		border-radius: 0;
		/* 滑動軌道 樣式 */
		&::-webkit-slider-runnable-track {
			height: 2px;
			background-color: #ddd;
			overflow: hidden;
		}
		/* 滑動鈕 樣式 */
		&::-webkit-slider-thumb {
			width: 10px;
			-webkit-appearance: none;
			height: 2px;
			background: #4e549f;
			box-shadow: getProgress($inputWidth, 0, #4e549f);
		}
		&::before {
			content: attr(data-currentValue);
			position: absolute;
			display: inline-flex;
			justify-content: center;
			z-index: 0;
			padding-top: 7px;
			top: 4px;
			left: calc(v-bind(progress) - 12px);
			width: 35px;
			height: 60px;
			background-image: url("./assets/ValueIndicator_bg.svg");
			background-repeat: no-repeat;

			font-family: Lato;
			font-size: 12px;
			font-weight: bold;
			line-height: 1.5;
			text-align: left;
			color: #fff;
		}
	}
}
</style>
