<template>
	<span
		v-if="isValidType"
		tab-pane
		:active="activeAttr || undefined"
		:disabled="disabledAttr || undefined"
		@click="emit"
	>
		<slot></slot>
	</span>
	<button v-else-if="!activeAttr" @click="emit">
		<slot></slot>
	</button>
	<span v-else>
		<slot></slot>
	</span>
</template>

<script lang="ts" setup>
import {
	getCurrentInstance,
	computed,
} from "vue";
import { types } from './tabs.vue';
import UsTabs from './tabs.vue';

const props = defineProps<{
	value?: any,
	disabled?: boolean,
}>();

const instance = getCurrentInstance()!;
const parent = computed(() => {
	let _parent = instance.parent;
	while (_parent && _parent.type.name !== UsTabs.name) {
		_parent = _parent.parent;
	}
	return _parent;
});
const activeAttr = computed(() => !props.disabled && (parent.value?.props?.modelValue === props.value || undefined));
const disabledAttr = computed(() => props.disabled || undefined);
const isValidType = computed(() => types.includes(parent.value?.props?.type));

function emit() {
	if (!props.disabled) {
		parent.value?.emit("update:modelValue", props.value);
	}
}
</script>
