<template>
	<button :class="$style.button" :active="active" :type_="type">
		<slot></slot>
	</button>
</template>
<script lang="ts" setup>
import { PropType } from "vue";
defineProps({
	type: String as PropType<typeof types[number]>,
	active: Boolean,
});
</script>
<script lang="ts">
export const types = [
	"default",
	"mobile",
	'gamelist-mobile',
	'analysis-mobile1',
	'analysis-mobile2',
] as const;
</script>

<style lang="scss" module>
.button[type_="default"] {
	cursor: pointer;
	padding: 1px 17px 1px 16px;
	border-radius: 6px;
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
	background-image: linear-gradient(to bottom, #ffe7cb, #c08544 75%, #b47836);
	border-color: unset;
	border-style: unset;
	background-color: unset;
	font-size: 12px;
	line-height: 1.87;
	color: #ffffff;
}
.button[type_="mobile"] {
	cursor: pointer;
	border-color: unset;
	border-style: unset;
	padding: 6px 16px;
	object-fit: contain;
	border-radius: 34px;
	background-image: linear-gradient(to bottom, #bfcaf2, #7a8ed1);

	font-size: 13px;
	font-weight: 500;
	line-height: 1.46;
	color: #fff;
}
.button[type_="gamelist-mobile"] {
	padding: 8px 12px;
	object-fit: contain;
	border-radius: 4px;
	border: solid 1px #c7c7c7;
	background-color: #f4f4f4;

	&[active="true"],
	&:active {
		object-fit: contain;
		border-radius: 4px;
		border: solid 1px #737fc1;
		background-color: #d9ddf0;
	}
}
.button[type_="analysis-mobile1"] {
	@extend [type_="mobile"];
	padding: 4px 8px 3px 7px;
	border-radius: 20px;
	background-image: linear-gradient(to bottom, #e6e9f6, #cdd5ef 53%, #ebedf7);

	font-size: 11px;
	font-weight: 500;
	line-height: 1.55;
	color: #505155;
}
.button[type_="analysis-mobile2"] {
	@extend [type_="mobile"];
	padding: 3px 7px 3px 8.3px;
	border-radius: 14px;
	background-image: linear-gradient(to bottom, #bfcaf2, #7a8ed1);

	font-size: 11px;
	font-weight: 500;
	line-height: 2.18;
	color: #fff;
}
</style>