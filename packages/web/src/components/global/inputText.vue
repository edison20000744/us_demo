<template>
	<input type="text" :inputType="inputType" v-model="modelValueProxy" />
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import { ref, watch } from 'vue';

const props = defineProps({
	inputType: String as PropType<'' | "search">,
	modelValue: { type: [String, Number] as PropType<string | number>, required: true },
});
const emit = defineEmits<{
	(event: 'update:modelValue', payload?: string | number): void
}>();
const modelValueProxy = ref(props.modelValue);

watch(() => props.modelValue, () => {
	modelValueProxy.value = props.modelValue;
});
watch(modelValueProxy, () => {
	emit("update:modelValue", modelValueProxy.value);
});

</script>
<style lang="scss" scoped>
input {
	padding: 8px 16px 8px 13px;
	border-radius: 6px;
	background-color: #f7f8fa;
	color: #8a8c8d;
	font-size: 14px;
	border-style: none;
	box-sizing: border-box;
	border: solid 1.5px transparent;

	&:hover {
		border: solid 1.5px rgba(168, 122, 68, 0.5);
		background-color: #ffffff;
		color: #8a8c8d;
	}

	&:focus {
		outline: none;
		border: solid 1.5px rgba(168, 122, 68, 0.5);
		background-color: #ffffff;
		color: #171819;
	}

	&:active {
		// border-style: none;
		color: #171819;
	}

	&:disabled {
		border: solid 1px #d5d6d7;
		background-color: #e5e7e8;
		color: #909293;
	}
}

input[inputType="search"],
.search-input {
	background-image: url("/icon/icon_search.svg");
	background-repeat: no-repeat;
	background-position: right 10px bottom 50%;
	padding-right: 30px;
}
</style>