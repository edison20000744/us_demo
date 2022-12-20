<template>
	<label class="radio" :type="type">
		<input type="radio" :value="value" v-model="modelValueProxy" :disabled="disabled" />
		<span class="checkmask"></span>
		<slot></slot>
	</label>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { ref, watch } from 'vue';

const props = defineProps({
	type: { type: String as PropType<typeof types[number]>, default: 'default' },
	value: [String, Number, Array, Boolean] as PropType<string | number | boolean | string[]>,
	modelValue: { type: [String, Number, Array, Boolean] as PropType<string | number | boolean | string[]>, required: true },
	disabled: Boolean,
});
const emit = defineEmits<{
	(event: 'update:modelValue', payload?: string | number | boolean | string[]): void
}>();

const modelValueProxy = ref(props.modelValue);

watch(() => props.modelValue, () => {
	modelValueProxy.value = props.modelValue;
});
watch(modelValueProxy, () => {
	emit("update:modelValue", modelValueProxy.value);
});
</script>

<script lang="ts">
export const types = [
	'default',
	'tg',
	'mobile-home',
	'gamelist-mobile',
] as const;
</script>

<style lang="scss" scoped>
.radio[type="default"] {
	font-size: 14px;
	color: #555657;
	font-weight: 500;
	display: inline-flex;
	align-items: center;
	gap: 5px;

	>input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	>.checkmask {
		position: relative;
		width: 12px;
		height: 12px;
		border: 1px solid #909293;
		border-radius: 50%;
		box-sizing: border-box;
		background-color: #fff;
	}

	>input:checked+.checkmask {
		border: none;
		background-color: #b8956c;

		&::before {
			content: "";
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translateX(-50%) translateY(-50%);

			display: block;
			width: 4px;
			height: 4px;
			border-radius: 50%;
			background-color: #fff;
		}
	}
}

.radio[type="tg"] {
	@extend .radio, [type="default"];

	font-weight: unset;

	>input:checked+.checkmask {
		background: var(--checkbox-bgColor);
	}
}

.radio[type="mobile-home"] {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row-reverse;

	cursor: pointer;
	user-select: none;
	position: relative;
	padding: 12px 0 12px 8px;

	font-size: 13px;
	color: #505155;
	border-bottom: 1px solid #d9ddf0;

	&:last-child {
		border: none;
	}

	>input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	.checkmask {
		// content: "";
		display: inline-block;
		width: 20px;
		height: 20px;
		border: 1px solid #cdcdd6;
		border-radius: 50%;
		box-sizing: border-box;
		background-color: #fff;
		margin-right: 10px;
	}

	>input:checked+.checkmask {
		position: relative;
		border: none;
		background-color: #737fc1;
		background-size: 10px;

		&::before {
			content: "";
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translateX(-50%) translateY(-50%);

			display: block;
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background-color: #fff;
		}
	}
}

.radio[type="gamelist-mobile"] {
	@extend .radio, [type="default"];
	font-size: 13px;
	line-height: 1.46;
	color: #505155;

	>.checkmask {
		width: 20px;
		height: 20px;
	}

	>input:checked+.checkmask {
		background-color: #737fc1;

		&::before {
			border-radius: 10px;
			width: 8px;
			height: 8px;
		}
	}
}
</style>
