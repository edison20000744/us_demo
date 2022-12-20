<template>
	<button v-if="types.includes(type)" ref="selectEl" :class="$style.select" :show="clicked"
		@click="e => { clicked = true; e.preventDefault(); }" :type_="type">
		<span>{{ currentOption?.children }}</span>
		<div v-if="!isMobile" :class="$style.optionsWrap">
			<div :class="$style.options">
				<span v-for="option in options"
					:class="option.value === modelValue ? [$style.option, $style.active] : $style.option"
					@click="onClickValue($event, option.value)">{{ option.children }}</span>
			</div>
		</div>
		<select v-else v-model="modelValueProxy">
			<option v-for="option in options" :value="option.value">{{ option.children }}</option>
		</select>
	</button>
	<select v-else v-model="modelValueProxy">
		<option v-for="option in options" :value="option.value">{{ option.children }}</option>
	</select>
</template>

<script lang="ts" setup>
import {
	getTransitionRawChildren,
	computed,
	useSlots,
	ref,
} from "vue";
import { onClickOutside } from '@vueuse/core';
import { isMobile } from 'mobile-device-detect';

const props = defineProps<{
	type?: typeof types[number],
	modelValue: any,
}>();
const emit = defineEmits<{
	(e: 'update:modelValue', v: any): void,
}>();
const slots = useSlots();
const clicked = ref(false);
const selectEl = ref<HTMLElement>();
const options = computed(() => {
	const result: { value: any, children: any }[] = [];
	const defaultSlot = slots.default?.();
	if (defaultSlot) {
		const options_2 = getTransitionRawChildren(defaultSlot);
		for (const option of options_2) {
			result.push({ value: option.props?.value, children: option.children });
		}
	}
	return result;
});
const modelValueProxy = computed({
	get: () => props.modelValue,
	set: value => emit("update:modelValue", value),
});
const currentOption = computed(() => options.value.find(option => option.value === modelValueProxy.value));

onClickOutside(selectEl, () => {
	clicked.value = false;
});

function onClickValue(event: MouseEvent, value: any) {
	clicked.value = false;
	event.stopPropagation();

	if (value !== modelValueProxy.value) {
		modelValueProxy.value = value;
	}
}
</script>

<script lang="ts">
export const types = [
	'home',
	'db',
	'analysis',
	'match-live',
	'leagues',
	'mobile/leagues',
	'news',
] as const;
</script>

<style lang="scss" module scoped>
.select {
	white-space: nowrap;

	.optionsWrap {
		max-height: 400px;
		overflow: auto;
	}

	>select {
		opacity: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		font-size: 1rem;
	}
}

.select[show="false"] {
	.optionsWrap {
		display: none;
	}
}

.select[type_="home"] {
	display: inline-block;
	position: relative;

	border: 1px solid #909293;
	box-sizing: border-box;
	border-radius: 6px;
	height: 26px;
	padding-left: 16px;
	padding-right: 44px;
	color: #909293;
	font-size: 14px;
	font-weight: 500;
	appearance: none;
	background: url(./assets/icon_select-arrowdown.png) no-repeat right 16px center,
		#fff;
	background-size: 12px;

	&:focus {
		color: #171819;
		outline: none;
	}

	.optionsWrap {
		position: absolute;
		top: 31px;
		right: 0;
		width: 100%;
		z-index: 1;
		border-radius: 6px;
		background: #fff;
		padding: 12px 0;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
	}

	.options {
		display: flex;
		flex-direction: column;

		background: #fff;
		color: #909293;
		text-align: left;
	}

	.option {
		min-height: 26px;
		line-height: 26px;
		padding-left: 16px;

		&.active {
			color: #a87a44;
			font-weight: 500;
		}

		&:hover {
			background-color: rgb(#a87a44, 0.1);
		}
	}
}

.select[type_="db"] {
	@extend [type_="home"];
	border-color: #d5d6d7;
	height: 36px;
	text-align: left;
}

.select[type_="analysis"] {
	display: inline-block;
	position: relative;

	border: 1px solid #d5d6d7;
	box-sizing: border-box;
	border-radius: 6px;
	height: 24px;
	margin-right: 20px;
	padding: 0 36px 0 0;
	color: #909293;
	font-size: 12px;
	font-weight: 500;
	appearance: none;
	background: url(./assets/icon_select-arrowdown.png) no-repeat right 16px center;
	background-size: 12px;
	border: none;

	&:focus {
		color: #171819;
		outline: none;
	}

	.optionsWrap {
		position: absolute;
		top: 31px;
		right: 0;
		width: 100%;
		z-index: 1;
		border-radius: 6px;
		background: #fff;
		padding: 12px 0;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
	}

	.options {
		display: flex;
		flex-direction: column;

		background: #fff;
		color: #909293;
		text-align: left;
	}

	.option {
		height: 24px;
		line-height: 24px;
		padding-left: 16px;

		&.active {
			color: #a87a44;
			font-weight: 500;
		}

		&:hover {
			background-color: rgb(#a87a44, 0.1);
		}
	}
}

.select[type_="match-live"] {
	display: inline-block;
	position: relative;
	background-color: transparent;
	border: none;
	padding: 0;
	margin: 0;

	background-image: url(@us/web/components/match-player/assets/match-live-television.svg);
	background-size: 100%;
	width: 17px;
	height: 16px;

	>span {
		display: none;
	}

	.optionsWrap {
		position: absolute;
		top: 100%;
		left: 0;
		margin-top: 5px;
		width: 122px;
		background: rgba($color: #171819, $alpha: 0.9);
		padding: 9px 0;
	}

	.options {
		display: flex;
		flex-direction: column;

		color: #fff;
		font-size: 12px;
	}

	.option {
		line-height: 30px;
		padding: 0;

		&.active,
		&:hover {
			background-color: rgba($color: #fff, $alpha: 0.1);
		}

		&.active::before {
			content: "";
			display: inline-block;
			width: 12px;
			height: 9px;
			background-image: url(./assets/icon_checked.svg); // TODO
			background-repeat: no-repeat;
			margin-right: 6px;
		}
	}

	&[setting-icon] {
		background-image: url(@us/web/components/match-player/assets/match-live-settings.svg);
		width: 28px;
		height: 28px;

		.optionsWrap {
			top: unset;
			left: unset;
			bottom: 100%;
			right: 0;
			margin-bottom: 5px;
		}
	}
}

.select[type_="leagues"] {
	@extend [type_="home"];
	height: 36px;
	border: unset;
	border-radius: 6px;
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
	background-color: #fff;

	.optionsWrap {
		top: 40px;
	}
}

.select[type_="mobile/leagues"] {
	@extend [type_="leagues"];

	>span {
		&:first-child {
			display: block;
			overflow: hidden;
			white-space: nowrap;
		}
	}

	.optionsWrap {
		width: auto;
		min-width: 100%;
		left: 0;
		right: auto;
	}

	.option {
		white-space: nowrap;
	}
}

.select[type_="news"] {
	@extend [type_="home"];
	border-color: #d5d6d7;
	height: 36px;
	text-align: left;

	.optionsWrap {
		top: initial;
		bottom: 0;
	}
}
</style>
