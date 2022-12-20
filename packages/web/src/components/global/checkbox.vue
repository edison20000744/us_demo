<template>
	<label class="checkbox" :checked="modelValue" :type="type">
		<input
			type="checkbox"
			:checked="modelValue"
			:indeterminate.prop="indeterminate"
			:disabled="disabled"
			@input="onInput"
		/>
		<slot></slot>
	</label>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

const emit = defineEmits<{
	(event: 'update:modelValue', payload: boolean): void
}>();
const props = defineProps({
	type: String as PropType<typeof types[number]>,
	modelValue: Boolean,
	indeterminate: Boolean,
	disabled: Boolean,
});

function onInput(event: Event) {
	if (props.indeterminate) {
		// @ts-ignore
		event.target.checked = false;
		emit("update:modelValue", false);
	} else {
		// @ts-ignore
		emit("update:modelValue", event.target.checked);
	}
}
</script>

<script lang="ts">
export const types = [
	'home',
	'analysis',
	'tg',
	'tg-Insurance',
	'gamelist',
	'gamelist-pc',
	'gamelist-mobile',
	'gamelist-mobile2',
	'mobile-home',
	'analysis-mobile',
] as const;
</script>

<style lang="scss" scoped>
.checkbox[type="home"] {
	display: inline-flex;
	align-items: center;
	gap: 5px;
	padding: 0 16px;

	cursor: pointer;
	user-select: none;
	position: relative;
	color: #555657;
	font-size: 14px;
	font-weight: 500;
	height: 26px;

	border: 1px solid #b1b2b3;
	border-radius: 6px;
	box-sizing: border-box;

	>input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	&::before {
		content: "";
		width: 12px;
		height: 12px;
		border: 1px solid #909293;
		border-radius: 2px;
		box-sizing: border-box;
		background-color: #fff;
	}

	&[checked="true"] {
		color: #784508;
		background: #d1ae84;
		border-color: #d1ae84;

		&::before {
			background: url(./assets/icon_checked.svg) no-repeat center, #a87a44;
			background-size: 10px;
			border: 1px solid #a87a44;
		}
	}
}

.checkbox[type="analysis"] {
	display: inline-flex;
	align-items: center;

	cursor: pointer;
	user-select: none;
	position: relative;

	>input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	&::before {
		content: "";
		width: 16px;
		height: 16px;
		border: 1px solid #8a8c8d;
		border-radius: 50%;
		box-sizing: border-box;
		background-color: #fff;
	}

	&[checked="true"]::before {
		background: url(./assets/icon_checked.svg) no-repeat center, #a87a44;
		background-size: 10px;
	}
}

.checkbox[type="tg"] {
	display: inline-flex;
	align-items: center;

	cursor: pointer;
	user-select: none;
	position: relative;

	font-size: 14px;
	color: #555657;

	>input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	&::before {
		content: "";
		display: inline-block;
		width: 16px;
		height: 16px;
		border: 1px solid #909293;
		border-radius: 4px;
		box-sizing: border-box;
		background-color: #fff;
		margin-right: 10px;
	}

	&[checked="true"]::before {
		border: none;
		background: url(./assets/icon_checked.svg) no-repeat center, var(--checkbox-bgColor);
		background-size: 10px;
	}
}

.checkbox[type="tg-Insurance"] {
	display: inline-flex;
	align-items: center;
	cursor: pointer;
	user-select: none;
	position: relative;
	border-radius: 20px;
	padding: 3px 10px 3px 5px;
	gap: 5px;
	color: #2E3ED4;
	background-color: #fff;
	border: solid 1px #2E3ED4;

	>input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	&::before {
		content: "";
		width: 16px;
		height: 16px;
		border: 1px solid #8a8c8d;
		border-radius: 50%;
		box-sizing: border-box;
	}

	&[checked="true"] {
		color: #fff;
		background-color: #2E3ED4;

		&::before {
			background: url(./assets/icon_checked-blue.svg) no-repeat center, #fff;
			background-size: 10px;
		}
	}
}

.checkbox[type="gamelist"] {
	display: inline-flex;
	align-items: center;
	gap: 5px;
	padding: 0px 16px;
	word-break: keep-all;

	cursor: pointer;
	user-select: none;
	position: relative;
	color: #909293;

	font-size: 12px;
	line-height: 1.33;
	width: max-content;
	height: 22px;
	line-height: 22px;

	background-color: #ffffff;
	border: 1px solid #909293;
	border-radius: 6px;
	box-sizing: border-box;

	>input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	&[checked="true"] {
		color: #a87a44;
		background: #ffffff;
		border-color: #a87a44;
	}
}

.checkbox[type="mobile-home"] {
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

	&::before {
		content: "";
		display: inline-block;
		width: 20px;
		height: 20px;
		border: 1px solid #cdcdd6;
		border-radius: 4px;
		box-sizing: border-box;
		background-color: #fff;
		margin-right: 10px;
	}

	&[checked="true"]::before {
		border: none;
		background: url(./assets/icon_checked.svg) no-repeat center, #737fc1;
		background-size: 10px;
	}
}

.checkbox[type="gamelist-mobile"] {
	display: inline-flex;
	align-items: center;

	cursor: pointer;
	user-select: none;
	position: relative;

	font-size: 13px;
	line-height: 1.46;
	color: #505155;

	>input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	&::before {
		content: "";
		display: inline-block;
		width: 16px;
		height: 16px;
		border: 1px solid #909293;
		border-radius: 4px;
		box-sizing: border-box;
		background-color: #fff;
		margin-right: 10px;
	}

	&[checked="true"]::before {
		border: none;
		background: url(./assets/icon_checked.svg) no-repeat center, #737fc1;
		background-size: 10px;
	}
}

.checkbox[type="gamelist-pc"] {
	@extend [type="gamelist-mobile"];
	// margin: 22px 36px 8px 6px;
	font-size: 12px;
	line-height: 1.33;
	text-align: left;
	color: #555657;

	>input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	&::before {
		content: "";
		width: 12px;
		height: 12px;
		margin-right: 5px;
		padding: 3px 2px 3px 2px;
		border-radius: 2px;
		border: solid 1px #909293;
		background-color: #fff;
	}

	&[checked="true"]::before {
		padding: 3px 2px 3px 2px;
		background-color: #a87a44;
	}
}

.checkbox[type="gamelist-mobile2"] {
	@extend [type="gamelist"];
	margin: 0 8px;
	padding: 4px 12px;
	object-fit: contain;
	border-radius: 4px;
	border: solid 1px #c7c7c7;
	background-color: #f4f4f4;
	font-size: 13px;
	line-height: 1.46;
	color: #505155;

	&[checked="true"] {
		color: #505155;
		border: solid 1px #737fc1;
		background-color: #d9ddf0;
	}
}

.checkbox[type="analysis-mobile"] {
	display: inline-block;
	font-style: 13px;
	color: #505155;
	padding: 12px 8px;
}
</style>
