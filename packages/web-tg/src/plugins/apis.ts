import { defineApis } from '@us/api';
import { useTgChatSocket, useWebSocket } from '@us/ws';
import { App, computed, Ref } from 'vue';
import * as utils from '@us/utils';
import { useSession } from '@us/web-tg/stores/session';
import { useSettings } from '@us/utils';

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

	const session = useSession();
	const settings = useSettings();

	let currentRoomId = '';
	const _user = computed(() => {
		if (roomId.value) {
			return session.user;
		}
	});
	const socket = useTgChatSocket(_user, computed(() => settings.language));
	socket.onReconnect(sendConnect);
	socket.onConnected(data => {
		if (data) {
			currentRoomId = data.roomId;
		}
	});

	sendConnect();

	return {
		...socket,
		sendConnect: undefined,
		sendPushMessage,
	}
	function sendConnect() {
		if (roomId.value) {
			socket.sendConnect(roomId.value);
		}
	}
	function sendPushMessage(msg: string, msgType: number) {
		socket.sendPushMessage(currentRoomId, msgType, msg);
	}
}
