import { defineApis } from '@us/api';
import { useWebSocket, useChatSocket } from '@us/ws';
import { App, computed, Ref, watch } from 'vue';
import * as utils from '@us/utils';
import { useSession } from '../stores/session';

export function installApis(app: App) {

	let apis: ReturnType<typeof createApis> | undefined;

	utils.installApis(app, () => apis ?? (apis = createApis()));

	function createApis() {

		const settings = utils.useSettings();
		const apiSession = useSession();
		const requests = defineApis(apiSession.getValidToken, () => settings.language);
		const messages = useWebSocket(computed(() => apiSession.token), computed(() => settings.language));
		const apis = {
			...requests,
			...messages,
		};

		return apis;
	}
}

export function useChatApis(roomId: Ref<string | undefined>) {

	const settings = utils.useSettings();
	const apiSession = useSession();
	const _token = computed(() => {
		if (roomId.value) {
			return apiSession.token;
		}
	});
	const chatroom = useChatSocket(_token, computed(() => settings.language));
	chatroom.onReconnect(sendConnect);
	let joinedRoomId: string | undefined;

	watch(roomId, sendConnect, { immediate: true });

	return {
		...chatroom,
		sendConnect: undefined,
		sendPushMessage,
	}
	function sendConnect() {
		if (roomId.value === joinedRoomId) {
			return;
		}
		if (joinedRoomId) {
			chatroom.leaveRoom(joinedRoomId);
			joinedRoomId = undefined;
		}
		if (roomId.value) {
			chatroom.sendConnect(roomId.value);
			joinedRoomId = roomId.value;
		}
	}
	function sendPushMessage(msg: string) {
		if (roomId.value) {
			chatroom.sendPushMessage(roomId.value, msg);
		}
	}
}
