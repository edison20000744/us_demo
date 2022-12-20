import * as ChatProtos from '@us/proto/chat';
import * as SocketProtos from '@us/proto/socket';
import type { MessageType } from '@protobuf-ts/runtime';
import mitt, * as Mitt from 'mitt';
import { Ref, onScopeDispose, computed, watch } from 'vue';
import type { Lang } from '@us/locales';
import MD5 from "crypto-js/md5";
import { useEnv } from '@us/utils';

type MayPromise<T> = T | Promise<T>;

function useWs(
	url: Ref<string | undefined>,
	pingData: any,
	parsers: {
		fromWsData: (data: any) => MayPromise<{ command: any, data: any } | undefined>,
		toWsData: (command: any, data?: any) => any,
	},
) {

	let _ws: WebSocket | undefined;
	let timer: number | undefined;
	let lastReceiveAt = 0;
	let pinged = false;
	let onMessage = mitt();
	let onConnect = mitt();
	const dataToSend: any[] = [];

	watch(url, () => {
		clearWs();
		clearTimer()
		if (url.value !== undefined) {
			const _url = url.value;
			startup(_url, false);
			resetPingTimer();
			if (pingData) {
				timer = setInterval(() => {
					if (!_ws) return;
					const now = Date.now();
					if (now - lastReceiveAt > 5000 && !pinged && _ws.readyState === _ws.OPEN) {
						pinged = true;
						_ws.send(pingData);
					}
					else if (now - lastReceiveAt > 10000) {
						clearWs();
						startup(_url, true);
						resetPingTimer();
					}
				}, 1000);
			}
		}
	}, { immediate: true });

	function clearWs() {
		if (_ws) {
			_ws.close();
			_ws = undefined;
		}
	}
	function clearTimer() {
		if (timer) {
			clearInterval(timer);
			timer = undefined;
		}
	}
	function startup(url: string, isReconnect: boolean) {
		_ws = new WebSocket(url);
		_ws.addEventListener('open', () => {
			for (const d of dataToSend) {
				_ws?.send(d);
			}
			resetPingTimer();
			if (isReconnect) {
				onConnect.emit('reconnect');
			}
		});
		_ws.addEventListener('message', async ev => {
			resetPingTimer();
			try {
				const msg = await parsers.fromWsData(ev.data);
				if (msg) {
					onMessage.emit(msg.command.toString(), msg.data);
				}
			}
			catch (err) {
				console.log('解析WS Data失敗', err, ev.data);
			}
		});
	}

	return {
		onReconnect,
		on,
		send,
	};

	function resetPingTimer() {
		lastReceiveAt = Date.now();
		pinged = false;
	}
	function onReconnect(handler: Mitt.Handler) {
		onConnect.on('reconnect', handler);
		onScopeDispose(() => {
			onConnect.on('reconnect', handler);
		});
	}
	function on(command: any, handler: Mitt.Handler<any>) {
		onMessage.on(command.toString(), handler);
		onScopeDispose(() => {
			onMessage.off(command.toString(), handler);
		});
	}
	function send(cmd: any, data?: any) {
		if (url.value) {
			_send();
		}
		else {
			const unwatch = watch(url, _send_2);

			function _send_2() {
				if (url.value) {
					_send();
					unwatch();
				}
			}
		}

		function _send() {
			const _data = parsers.toWsData(cmd, data);
			if (_ws && _ws.readyState === _ws.OPEN) {
				_ws.send(_data);
			}
			else {
				dataToSend.push(_data);
			}
		}
	}
}
export function useWebSocket(token: Ref<string | undefined>, lang: Ref<Lang>) {

	const url = computed(() => {
		if (token.value) {
			return useEnv().VITE_WS_URL + '?token=' + token.value + '&lang=' + lang.value;
		}
	});
	const msgs: Partial<Record<SocketProtos.Command, MessageType<any>>> = {
		[SocketProtos.Command.tgMatchUpdate]: SocketProtos.TgMatchUpdate,
		[SocketProtos.Command.matchUpdate]: SocketProtos.MatchUpdate,
		[SocketProtos.Command.goalNotify]: SocketProtos.GoalNotify,
		[SocketProtos.Command.indexUpdate]: SocketProtos.IndexUpdate,
		[SocketProtos.Command.newMatches]: SocketProtos.NewMatches,
		[SocketProtos.Command.openDateChange]: SocketProtos.OpenDateChange,
		[SocketProtos.Command.deleteMatches]: SocketProtos.DeleteMatches,
		[SocketProtos.Command.tgRecentMatches]: SocketProtos.TgRecentMatches,
		[SocketProtos.Command.matchDetail]: SocketProtos.MatchDetail,
		[SocketProtos.Command.matchLineup]: SocketProtos.MatchLineup,
		[SocketProtos.Command.tgOddsUpdate]: SocketProtos.TgOddInfo,
		[SocketProtos.Command.popularMatches]: SocketProtos.PopularMatches,
		[SocketProtos.Command.systemMaintain]: SocketProtos.SystemMaintain,
		[SocketProtos.Command.subscribeResult]: SocketProtos.SubscribeResult,
		[SocketProtos.Command.subscribeTgRecentMatches]: SocketProtos.SubscribeTgRecentMatches,
		[SocketProtos.Command.subscribeMatchDetail]: SocketProtos.SubscribeMatchDetail,
		[SocketProtos.Command.subscribeMatchTgOdds]: SocketProtos.SubscribeTgOdds,
	};

	const { onReconnect, on, send } = useWs(
		url,
		'ping',
		{
			fromWsData: (blob: Blob) => parseProtoBolb(blob, msgs),
			toWsData: (cmd: number, data: any) => toProtoBolb(cmd, data, msgs),
		},
	);

	return {
		onReconnect,
		onTgMatchInfo,
		onMatchUpdate,
		onGoalNotify,
		onIndexUpdate,
		onNewMatches,
		onOpenDateChange,
		onDeleteMatches,
		onTgRecentMatches,
		onMatchDetail,
		onMatchLineup,
		onTgOddInfo,
		onPopularMatches,
		onSubscribeResult,
		onServerMaintain,
		subscribeTgRecentMatches,
		subscribeMatchDetail,
		subscribeMatchTgOdds,
	};

	function onTgMatchInfo(handler: Mitt.Handler<SocketProtos.TgMatchUpdate>) {
		on(SocketProtos.Command.tgMatchUpdate, handler);
	}
	function onMatchUpdate(handler: Mitt.Handler<SocketProtos.MatchUpdate>) {
		on(SocketProtos.Command.matchUpdate, handler);
	}
	function onGoalNotify(handler: Mitt.Handler<SocketProtos.GoalNotify>) {
		on(SocketProtos.Command.goalNotify, handler);
	}
	function onIndexUpdate(handler: Mitt.Handler<SocketProtos.IndexUpdate>) {
		on(SocketProtos.Command.indexUpdate, handler);
	}
	function onNewMatches(handler: Mitt.Handler<SocketProtos.NewMatches>) {
		on(SocketProtos.Command.newMatches, handler);
	}
	function onOpenDateChange(handler: Mitt.Handler<SocketProtos.OpenDateChange>) {
		on(SocketProtos.Command.openDateChange, handler);
	}
	function onDeleteMatches(handler: Mitt.Handler<SocketProtos.DeleteMatches>) {
		on(SocketProtos.Command.deleteMatches, handler);
	}
	function onTgRecentMatches(handler: Mitt.Handler<SocketProtos.TgRecentMatches>) {
		on(SocketProtos.Command.tgRecentMatches, handler);
	}
	function onMatchDetail(handler: Mitt.Handler<SocketProtos.MatchDetail>) {
		on(SocketProtos.Command.matchDetail, handler);
	}
	function onMatchLineup(handler: Mitt.Handler<SocketProtos.MatchLineup>) {
		on(SocketProtos.Command.matchLineup, handler);
	}
	function onTgOddInfo(handler: Mitt.Handler<SocketProtos.TgOddInfo>) {
		on(SocketProtos.Command.tgOddsUpdate, handler);
	}
	function onPopularMatches(handler: Mitt.Handler<SocketProtos.PopularMatches>) {
		on(SocketProtos.Command.popularMatches, handler);
	}
	function onSubscribeResult(handler: Mitt.Handler<SocketProtos.SubscribeResult>) {
		on(SocketProtos.Command.subscribeResult, handler);
	}
	function onServerMaintain(handler: Mitt.Handler<SocketProtos.SystemMaintain>) {
		on(SocketProtos.Command.systemMaintain, handler);
	}
	function subscribeTgRecentMatches(identifier: SocketProtos.SubscribeTgRecentMatches['identifier'], type = true) {
		send(SocketProtos.Command.subscribeTgRecentMatches, { type, identifier });
	}
	function subscribeMatchDetail(matchId: number, type: boolean, identifier: string = '') {
		send(SocketProtos.Command.subscribeMatchDetail, { matchId, type, identifier });
	}
	function subscribeMatchTgOdds(matchId: number, type: boolean, identifier: string = '') {
		send(SocketProtos.Command.subscribeMatchTgOdds, { matchId, type, identifier });
	}
}
export function useChatSocket(token: Ref<string | undefined>, lang: Ref<Lang>) {

	const url = computed(() => {
		if (token.value) {
			return useEnv().VITE_CHAT_URL + '?token=' + token.value + '&lang=' + lang.value;
		}
	});
	const msgs: Partial<Record<ChatProtos.Command, MessageType<any>>> = {
		[ChatProtos.Command.ConnectRequestCode]: ChatProtos.Connect,
		[ChatProtos.Command.unSubcribeLiveRoomRequestCode]: ChatProtos.unSubcribeLiveRoom,
		[ChatProtos.Command.PushMessageRequestCode]: ChatProtos.PushMessage,
		[ChatProtos.Command.NewMessageReplyCode]: ChatProtos.NewMessageReply,
		[ChatProtos.Command.HistoryMessageReplyCode]: ChatProtos.HistoryMessageReply,
		[ChatProtos.Command.RoomInfoReplyCode]: ChatProtos.RoomInfoReply,
		[ChatProtos.Command.RoomUserChangeReplyCode]: ChatProtos.RoomUserChangeReply,
		[ChatProtos.Command.NewMessageErrorReplyCode]: ChatProtos.ErrorMessageReply,
		[ChatProtos.Command.CloseChatReplyCode]: ChatProtos.CloseChatMessage,
	};

	const { onReconnect, on, send } = useWs(
		url,
		toProtoBolb(ChatProtos.Command.pingCode, undefined, msgs),
		{
			fromWsData: (blob: Blob) => parseProtoBolb(blob, msgs),
			toWsData: (cmd: number, data: any) => toProtoBolb(cmd, data, msgs),
		},
	);

	return {
		onReconnect,
		sendConnect,
		leaveRoom,
		sendPushMessage,
		onNewMessageReply,
		onHistoryMessageReply,
		onRoomInfoReply,
		onRoomUserChangeReply,
		onSendMessageFailed,
		onCloseChat,
	};

	function sendConnect(roomId: string) {
		send(ChatProtos.Command.ConnectRequestCode, {
			roomId,
		});
	}
	function leaveRoom(roomId: string) {
		send(ChatProtos.Command.unSubcribeLiveRoomRequestCode, {
			roomId,
		});
	}
	function sendPushMessage(roomId: string, msg: string) {
		send(ChatProtos.Command.PushMessageRequestCode, {
			roomId,
			msg,
			msgType: 1,
			hashUserId: 0,
		});
	}
	function onNewMessageReply(handler: Mitt.Handler<ChatProtos.NewMessageReply>) {
		on(ChatProtos.Command.NewMessageReplyCode, handler);
	}
	function onHistoryMessageReply(handler: Mitt.Handler<ChatProtos.HistoryMessageReply>) {
		on(ChatProtos.Command.HistoryMessageReplyCode, handler);
	}
	function onRoomInfoReply(handler: Mitt.Handler<ChatProtos.RoomInfoReply>) {
		on(ChatProtos.Command.RoomInfoReplyCode, handler);
	}
	function onRoomUserChangeReply(handler: Mitt.Handler<ChatProtos.RoomUserChangeReply>) {
		on(ChatProtos.Command.RoomUserChangeReplyCode, handler);
	}
	function onSendMessageFailed(handler: Mitt.Handler<ChatProtos.ErrorMessageReply>) {
		on(ChatProtos.Command.NewMessageErrorReplyCode, handler);
	}
	function onCloseChat(handler: Mitt.Handler<ChatProtos.CloseChatMessage>) {
		on(ChatProtos.Command.CloseChatReplyCode, handler);
	}
}
export function useTgChatSocket(user: Ref<{
	username: string,
	token: string,
} | undefined>, lang: Ref<Lang>) {

	const url = computed(() => {
		if (user.value) {
			return useEnv().VITE_CHAT_URL
				+ '?token=' + MD5(user.value.username.toLowerCase() + '_' + user.value.token)
				+ '&username=' + user.value.username.toLowerCase()
				+ '&lang=' + lang.value;
		}
	});
	const { onReconnect, on, send } = useWs(
		url,
		'PING',
		{
			fromWsData: (data) => {
				if (data === 'PONG') {
					return undefined;
				}
				const obj = JSON.parse(data);
				return { command: obj.command, data: obj };
			},
			toWsData: (cmd: string, data: any) => JSON.stringify({ type: cmd, ...(data ? data : {}) }),
		},
	);

	return {
		onReconnect,
		sendConnect,
		sendPushMessage,
		onNewMessageReply,
		onHistoryMessageReply,
		onConnected,
		onRoomInfoReply,
		onServerDisconnected,
		onSendMessageFailed,
		onBan,
		onSendMessageTooFast,
		onUserJoin,
		onShowOff,
	};

	function sendConnect(roomId: string) {
		send('subChatRoom', { roomId })
	}
	function sendPushMessage(roomId: string, msgType: number, msg: string) {
		send('pushChatRoom', { roomId, msgType, msg });
	}
	function onServerDisconnected(handler: Mitt.Handler<{
		/**
		 * @1040 連線驗證失敗
		 * @8144 聊天室已關閉
		 */
		statusCode: 1040 | 8144,
	}>) {
		on(8099, handler);
	}
	function onNewMessageReply(handler: Mitt.Handler<{
		roomId: string,
		message: {
			msgId: string,
			msgType: number,
			msgText: string,
			fromUser: {
				chatUserName: string,
				nickName: string,
				level: number,
			},
			createTime: number,
		},
	}>) {
		on(8100, handler);
	}
	function onConnected(handler: Mitt.Handler<{
		roomId: string,
		statusCode: string,
		chatUserName: string,
	}>) {
		on(8101, handler);
	}
	function onHistoryMessageReply(handler: Mitt.Handler<{
		roomId: string,
		messages: {
			msgId: string,
			msgType: number,
			msgText: string,
			dealData: {
				gameTime: string,
				gameName: string,
				marketTypeName: string,
				selectName: string,
				dealMoney: string,
				guaranteeType: number,
			}[],
			fromUser: {
				chatUserName: string,
				nickName: string,
				level: number,
			},
			createTime: number,
		}[],
	}>) {
		on(8102, handler);
	}
	function onRoomInfoReply(handler: Mitt.Handler<{
		roomId: string,
		userCnt: number,
		views: number,
	}>) {
		on(8103, handler);
	}
	function onSendMessageFailed(handler: Mitt.Handler<{
		/**
		 * @8141 超出字元長度
		 * @8142 含有禁止字元
		 * @8144 後台關閉聊天室功能
		 * @8145 發言次數過於頻繁
		 */
		statusCode: 8141 | 8142 | 8144 | 8145,
	}>) {
		on(8104, handler);
	}
	function onBan(handler: Mitt.Handler<{
		banEndTime: number,
		reason: string,
	}>) {
		on(8143, handler);
	}
	function onSendMessageTooFast(handler: Mitt.Handler<{
		banEndTime: number,
	}>) {
		on(8145, handler);
	}
	function onUserJoin(handler: Mitt.Handler<{
		joinTime: number,
		nickName: string,
		roomId: number,
	}>) {
		on(8300, handler);
	}
	function onShowOff(handler: Mitt.Handler<{
		roomId: string,
		message: {
			msgId: string,
			dealData: {
				gameTime: string,
				gameName: string,
				marketTypeName: string,
				selectName: string,
				dealMoney: string,
				guaranteeType: number,
			}[],
			fromUser: {
				chatUserName: string,
				nickName: string,
				level: number,
			},
			createTime: number,
		},
	}>) {
		on(8400, handler);
	}
}

function toProtoBolb(cmd: number, data: any, msgs: Partial<Record<number, MessageType<any>>>) {
	//查看送出訊息
	// console.log('toProtoBolb', data);
	if (data) {
		data.command = cmd;
		const message = msgs[cmd];
		if (!message) return;
		data = message.toBinary(data);
	}
	else {
		data = new Uint8Array()
	}

	const _cmd = new Uint8Array([cmd >> 24, cmd >> 16, cmd >> 8, cmd ^ ((cmd >> 8) << 8)]);
	const bolb = new Uint8Array(_cmd.length + data.length);
	bolb.set(_cmd);
	bolb.set(data, _cmd.length);

	return bolb;
}
async function parseProtoBolb(blob: Blob, msgs: Partial<Record<number, MessageType<any>>>) {

	const type: SocketProtos.Command = await getProtoMessageType(blob.slice(0, 4));
	const message = msgs[type];

	if (message) {
		const buffer = await blob.slice(4).arrayBuffer();
		const data = message.fromBinary(new Uint8Array(buffer));
		//查看回傳訊息
		// console.log('parseProtoBolb', data);
		return {
			command: type,
			data: data,
		}
	}
}
async function getProtoMessageType(blob: Blob) {
	const typeBytes = new Uint8Array(await blob.arrayBuffer());
	let i: number = (typeBytes[0]! & 0xFF) << 24;
	i = i | ((typeBytes[1]! & 0xFF) << 16);
	i = i | ((typeBytes[2]! & 0xFF) << 8);
	i = i | (typeBytes[3]! & 0xFF);
	return i;
}
