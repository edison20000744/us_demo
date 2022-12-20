<template>
	<label class="switch" :type="type">
		<slot></slot>
		<input type="checkbox" :checked="modelValue" @input="onInput" :disabled="disabled" />
		<span class="slider"></span>
	</label>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

defineProps({
	type: { type: String as PropType<typeof types[number]>, default: 'default' },
	modelValue: { type: Boolean, required: true },
	disabled: Boolean,
});
const emit = defineEmits<{
	(event: 'update:modelValue', payload: boolean): void
}>();

function onInput(event: Event) {
	// @ts-ignore
	emit("update:modelValue", event.target.checked);
}
</script>

<script lang="ts">
export const types = [
	'default',
	'tg',
	'default-mobile',
] as const;
</script>

<style lang="scss" scoped>
.switch {
	font-size: 14px;
	color: #555657;
	font-weight: 500;
	display: inline-flex;
	align-items: center;
	cursor: pointer;

	input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	input+.slider {
		position: relative;
		display: inline-block;
		width: 35px;
		height: 16px;
		border-radius: 9px;
		background: #909293;
		margin-left: 6px;
	}

	input+.slider::before {
		content: "";
		display: block;
		width: 12px;
		height: 12px;
		background: #ffffff;
		border-radius: 50%;
		position: absolute;
		top: 2px;
		left: 2px;
		transition: 0.4s;
	}

	input:checked+.slider {
		background: #a87a44;
	}

	input:checked+.slider::before {
		transform: translateX(19px);
	}
}

.switch[type="tg"] {
	input:checked+.slider {
		background: var(--switch-bg-color);
		box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.16);
		border: 1px solid #d5d6d7;
	}
}

.switch[type="default-mobile"] {
	input {
		height: 22px;
	}

	input+.slider {
		position: relative;
		display: inline-block;
		width: 41px;
		height: 23px;
		border-radius: 12px;
		background: url(./assets/switch-onRound.svg) no-repeat 25px, #cdcdd6;
		margin-left: 6px;
	}

	input+.slider::before {
		content: "";
		display: block;
		width: 15px;
		height: 15px;
		margin: 1px;
		border: solid 1px #eee;
		background-color: #eee;
		border-radius: 50%;
		transition: 0.4s;
	}

	input:checked+.slider {
		background-color: #737fc1;
		background: url(./assets/switch-offLine.svg) no-repeat 12px, #737fc1;
		box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.16);

		&::before {
			border: solid 1px #eee;
			background-color: #fff;
		}
	}

	input:checked+.slider ::after {
		content: "";
		display: block;
		width: 1;
		height: 7px;
		margin: 4.5px 0;
		object-fit: contain;
		border: solid 1px #a9b4d9;
	}
}
</style>
