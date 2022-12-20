<template>
	<div class="message-popup">
		<div>
			<header>{{ title }}</header>
			<main v-html="messageHtml"></main>
			<button @click="$emit('close')">{{ closeText || t.common.confirm }}</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from '@us/locales/tg';

const props = defineProps<{
	title: string,
	message: string,
	closeText?: string,
}>();
defineEmits({
	close: () => true,
});
const t = useI18n();
const brRegX: RegExp = new RegExp(/\\n/);
const messageHtml = computed(() => props.message.replace(brRegX, '<br>'));
</script>

<style lang="scss" >
.message-popup {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(13px);
	background-color: rgba($color: #000000, $alpha: 0.2);
	z-index: 2;

	> div {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 440px;
		max-width: calc(100% - 60px);
		background: url("/src/asset/image/bg-popup-pc.png") no-repeat bottom center,
			#ffffff;
		background-size: 100% auto;
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
	}

	> div header {
		height: 60px;
		line-height: 60px;
		text-align: center;
		background: var(--alert-header-bgcolor);
		color: #fff;
		font-size: 20px;
		letter-spacing: 3px;
		font-weight: 500;
	}

	> div main {
		padding: 30px;
		text-align: center;
		color: #283763;
		min-height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;

		p {
			font-size: 21px;
			padding: 0;
			margin: 0 0 5px 0;
			font-weight: 700;

			&.transfer_success::before {
				content: "";
				display: block;
				width: 96px;
				height: 96px;
				background: url("../asset/image/icon_transfer_success.png") no-repeat
					center;
				background-size: cover;
				margin: 0 auto 15px auto;
			}

			&.transfer_failed::before {
				content: "";
				display: block;
				width: 96px;
				height: 96px;
				background: url("../asset/image/icon_transfer_failed.png") no-repeat
					center;
				background-size: cover;
				margin: 0 auto 15px auto;
			}
		}
	}

	> div button {
		cursor: pointer;
		display: block;
		border: 0;
		width: calc(100% - 60px);
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 30px;
		height: 40px;
		border-radius: 20px;
		color: #ffffff;
		text-align: center;
		line-height: 40px;
		font-size: 16px;
		box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.16);
		background: var(--alert-btn-bgcolor);
	}
}

@media screen and (max-width: 768px) {
	.message-popup {
		backdrop-filter: blur(0);
		background-color: rgba($color: #000000, $alpha: 0.8);

		> div {
			border-radius: 15px;
			overflow: hidden;
			box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
			background: url("/src/asset/image/bg-popup-mobile.png") no-repeat bottom
					center,
				#ffffff;
			background-size: 100% auto;
		}

		> div header {
			background: var(--alert-header-bgcolor);
			font-weight: normal;
			font-size: 15px;
			height: 38px;
			line-height: 38px;
		}

		> div main {
			padding: 20px;

			p {
				font-size: 18px;

				&.transfer_success::before {
					width: 50px;
					height: 50px;
					margin: 0 auto 8px auto;
				}

				&.transfer_failed::before {
					width: 50px;
					height: 50px;
					margin: 0 auto 8px auto;
				}
			}
		}

		> div button {
			margin-bottom: 20px;
			width: calc(100% - 25px);
			box-shadow: none;
			background: var(--alert-btn-bgcolor);
		}
	}
}
</style>
