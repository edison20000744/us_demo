<template>
    <div class="chatroom-normal" :class="{ 'open-emoji-picker': showEmojiPicker }">
        <header>
            <span class="left">
                <span>{{ t.web_tg_c.txt_84 }}</span>
                <UsSwitch type="tg" v-model="toggle"></UsSwitch>
            </span>
            <span class="right" v-if="roomInfo">
                <!-- <img src="/src/asset/image/components/chatroom-user.svg" />
                <span>{{ roomInfo?.userCnt }} 在线</span>-->
                <span>{{ t.web_tg_c.txt_85 }}: {{ currency(roomInfo.views, 0) }}</span>
            </span>
        </header>
        <main v-show="toggle">
            <div class="messages" ref="mainEl">
                <template v-for="msg in messages">
                    <Message
                        v-if="msg.type === 'user-message'"
                        :key="msg.msgId"
                        :is-self="msg.fromUser?.userId === myUserId"
                        :data="msg"
                    ></Message>
                    <div
                        class="welcome-message"
                        v-else-if="msg.type === 'welcome-message'"
                    >{{ msg.message }}</div>
                    <div
                        class="invalid-message"
                        v-else-if="msg.type === 'invalid-message'"
                    >{{ msg.message }}</div>
                </template>
            </div>
            <button
                v-if="hasNewMessage"
                class="more-message"
                @click="gotoBottom"
            >{{ t.web_tg_c.txt_86 }}</button>
        </main>
        <footer v-show="toggle" ref="footerEl">
            <button
                @mousedown.prevent
                @mouseup="() => {
                    gotoBottom();
                    tryKeepBottoom();
                    showEmojiPicker = !showEmojiPicker;
                    triggerEmojiPicker = true;
                }"
                class="emoji-button"
                :active="showEmojiPicker"
            ></button>
            <input
                @keydown.enter="sendText"
                @focus="gotoBottom"
                v-model="inputText"
                :placeholder="closed ? `[${t.web_tg_c.txt_87}]` : !myUserId ? `[${t.web_tg_c.txt_88}]` : t.web_tg_c.txt_89"
            />
            <button class="send-button" @mousedown.prevent @mouseup="sendText" :active="shouldSend"></button>
            <EmojiPicker
                v-if="triggerEmojiPicker"
                class="emoji-picker"
                @pick-emoji="inputText += $event"
                @pick-sticker="sendMessage($event, 2); showEmojiPicker = false;"
            ></EmojiPicker>
        </footer>
    </div>
</template>

<script lang="ts" setup>
import { currency } from '@us/shared';
import { onClickOutside } from '@vueuse/core';
import { useDayJs } from '@us/utils';
import type { Ref } from 'vue';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import EmojiPicker from '@us/web/components/chatroom/emoji-picker.vue';
import Message from './chatroom-user-message.vue';
import { useChatApis } from '../plugins/apis';
import { useDialogs } from '../stores/dialogs'
import { usePlatform } from '@us/web-tg/stores/platform';
import { useI18n } from '@us/locales/tg';

const props = defineProps<{
    matchId: number,
    mini?: boolean,
    disableClose?: boolean,
    alive?: boolean,
}>();
const route = useRoute();
const t = useI18n();
const chatroom = useTgChatroom(computed(() => props.matchId), route.query.backUrl as string);

const showEmojiPicker = ref(false);
const triggerEmojiPicker = ref(false);
const hasNewMessage = ref(false);
const toggle = ref(true);
const inputText = ref('');
const {
    myUserId,
    messages,
    closed,
    roomInfo,
    sendMessage,
} = chatroom;
const mainEl = ref<HTMLElement>();
const footerEl = ref<HTMLElement>();
const sending = ref(false);

const shouldSend = computed(() => myUserId.value && inputText.value && !sending.value);

watch(() => messages.value?.length, async () => {
    const newMsg = [...messages.value].reverse().find(msg => msg.type === 'user-message') as TgUserMessage | undefined;
    if (props.mini && newMsg) {
        hasNewMessage.value = true;
    }
    if (newMsg?.fromUser?.userId === myUserId.value) {
        gotoBottom();
        if (newMsg?.msgType === 1) {
            sending.value = false;
            inputText.value = '';
        }
    }
    const keepBottom = await tryKeepBottoom();
    if (!keepBottom) {
        hasNewMessage.value = true;
    }
});
watch(toggle, () => {
    showEmojiPicker.value = false;
});
watch(() => props.alive, () => {
    if (props.alive) {
        gotoBottom();
    }
});
onMounted(() => {
    mainEl.value?.addEventListener('scroll', () => {
        if (hasNewMessage.value && onBottom()) {
            hasNewMessage.value = false;
        }
    });
});
onClickOutside(footerEl, () => {
    if (showEmojiPicker.value) showEmojiPicker.value = false;
});

function onBottom() {
    return mainEl.value && mainEl.value.scrollTop === mainEl.value.scrollHeight - mainEl.value.clientHeight;
}
async function tryKeepBottoom() {
    if (mainEl.value && onBottom()) {
        await nextTick();
        await nextTick(); // 避免打開表情框時貼底失敗
        mainEl.value.scrollTop = mainEl.value.scrollHeight - mainEl.value.clientHeight;
        return true;
    }
    return false;
}
function gotoBottom() {
    if (mainEl.value) {
        hasNewMessage.value = false;
        mainEl.value.scrollTop = mainEl.value.scrollHeight - mainEl.value.clientHeight;
    }
}
function sendText() {
    if (shouldSend.value) {
        sending.value = true;
        sendMessage(inputText.value, 1);
        setTimeout(() => {
            if (sending.value) sending.value = false;
        }, 1000);
    }
}
</script>

<script lang="ts">
export type TgUserMessage = {
    type: 'user-message',
    msgId: string;
    msgType?: number;
    msgText: string;
    fromUser?: {
        userId: string;
        userName: string;
        level: number;
    };
    createTime: number;
}
export type TgSystemMessage = {
    type: 'welcome-message';
    nickName: string;
    message: string;
}
export type InvalidMessage = {
    type: 'invalid-message';
    message: string;
}
export type TgMessage = TgUserMessage | TgSystemMessage | InvalidMessage;
function useTgChatroom(matchId: Ref<number>, backUrl: string | undefined) {

    const roomId = computed(() => matchId.value.toString());
    const chatApis = useChatApis(roomId);
    const dialogs = useDialogs()
    const platform = usePlatform();
    const t = useI18n();
    const dayjs = useDayJs();

    const roomInfo = ref<{
        userCnt: number,
        views: number,
    }>();
    const myUserId = ref<string>();
    const messages = ref<TgMessage[]>([]);
    const closed = ref(false);

    chatApis.onConnected(handle => {
        myUserId.value = handle.chatUserName;
    });
    chatApis.onNewMessageReply(handle => {
        if (handle.message) {
            messages.value.push({
                type: 'user-message',
                ...handle.message,
                fromUser: {
                    userId: handle.message.fromUser.chatUserName,
                    userName: handle.message.fromUser.nickName,
                    level: handle.message.fromUser.level,
                },
            });
        }
    });
    chatApis.onHistoryMessageReply(handle => {
        const msgIds = new Set<string>(messages.value.map(msg => 'msgId' in msg ? msg.msgId : ''));
        for (const newMsg of handle.messages) {
            if (!msgIds.has(newMsg.msgId)) {
                if (newMsg.dealData.length) {
                    // TODO
                    let msgText = '';
                    for (const deal of newMsg.dealData) {
                        msgText += `<p style="margin: 3px 0;">${deal.gameTime} ${deal.gameName}\n[${deal.marketTypeName} ${deal.selectName} ${t.web_tg_c.txt_2} <font color="#eda33e">${deal.dealMoney}</font>]</p>`;
                    }
                    messages.value.push({
                        type: 'user-message',
                        msgId: newMsg.msgId,
                        msgText,
                        createTime: newMsg.createTime,
                        msgType: 3,
                        fromUser: {
                            userId: newMsg.fromUser.chatUserName,
                            userName: newMsg.fromUser.nickName,
                            level: newMsg.fromUser.level,
                        },
                    });
                }
                else {
                    messages.value.push({
                        type: 'user-message',
                        ...newMsg,
                        fromUser: {
                            userId: newMsg.fromUser.chatUserName,
                            userName: newMsg.fromUser.nickName,
                            level: newMsg.fromUser.level,
                        },
                    });
                }
            }
        }
    });
    chatApis.onRoomInfoReply(handle => {
        roomInfo.value = handle;
    });
    chatApis.onServerDisconnected(handle => {
        if (handle.statusCode === 1040) {
            const title = t.web_tg_c.txt_11;
            const errMessage = t.web_tg.txt_100;
            dialogs.pop(title, errMessage);
            dialogs.setCloseHandle(platform.backToBackUrl);
        }
        else if (handle.statusCode === 8144) {
            closed.value = true;
        }
    });
    chatApis.onSendMessageFailed(handle => {
        if (handle.statusCode === 8142) {
            messages.value.push({
                type: 'invalid-message',
                message: t.web_tg.txt_103,
            });
        }
        else {
            let errorMessage: string | undefined;
            switch (handle.statusCode) {
                case 8141: errorMessage = t.web_tg.txt_104; break;
                // case 8142: errorMessage = '含有禁止文字、特殊字元、网址等'; break;
                case 8144: errorMessage = t.web_tg.txt_105; break;
                case 8145: errorMessage = t.web_tg.txt_106; break;
            }
            if (errorMessage) {
                dialogs.pop(
                    t.web_tg_c.txt_11,
                    errorMessage,
                );
            }
        }
    });
    chatApis.onBan(handle => {
        const dateText = dayjs(handle.banEndTime * 1000).format(`YYYY-MM-DD HH:mm:ss`);
        dialogs.pop(
            t.web_tg_c.txt_11,
            t.web_tg.txt_125
                .replace('{0}', dateText)
                .replace('{1}', handle.reason)
        );
    });
    chatApis.onShowOff(handle => {
        let msgText = '';
        for (const deal of handle.message.dealData) {
            msgText += `<p style="margin: 3px 0;">${deal.gameTime} ${deal.gameName}\n[${deal.marketTypeName} ${deal.selectName} ${t.web_tg_c.txt_2} <font color="#eda33e">${deal.dealMoney}</font>]</p>`;
        }
        messages.value.push({
            type: 'user-message',
            msgId: handle.message.msgId,
            msgText,
            createTime: handle.message.createTime,
            msgType: 3,
            fromUser: {
                userId: handle.message.fromUser.chatUserName,
                userName: handle.message.fromUser.nickName,
                level: handle.message.fromUser.level,
            },
        });
    });
    chatApis.onUserJoin(handle => {
        if (!messages.value.some(msg => msg.type === 'welcome-message' && msg.nickName === handle.nickName)) {
            messages.value.push({
                type: 'welcome-message',
                nickName: handle.nickName,
                message: t.web_tg.txt_109.replace('{0}', handle.nickName),
            });
        }
    });

    return {
        myUserId,
        closed,
        roomInfo,
        messages,
        sendMessage,
    };

    function sendMessage(text: string, msgType: number) {
        chatApis.sendPushMessage(text, msgType);
    }
}
</script>

<style lang="scss" scoped>
.chatroom-normal {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
    overflow: hidden;
    background: var(--chatroom-normal-bg);

    >header {
        height: 40px;
        padding: 0 16px;
        background-color: #f9f9fb;
        border-bottom: 1px solid #d5d6d7;

        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
            font-size: 14px;
            font-weight: 500;
            color: #283763;

            display: inline-flex;
            align-items: center;
        }

        .right {
            font-size: 12px;
            color: #555657;

            display: inline-flex;
            align-items: center;

            >img {
                margin-right: 6px;
            }
        }
    }

    >main {
        position: relative;
        flex: 1;
        overflow: hidden;
        padding-bottom: 0;
        background: var(--chatroom-bg);

        >.messages {
            height: 100%;
            padding: 16px;
            box-sizing: border-box;
            overflow-y: scroll;

            >*+* {
                margin-top: 7px;
            }

            >.welcome-message {
                font-size: 13px;
                color: #8e8e8e;
                font-weight: 700;
                text-align: center;
                margin-bottom: 7px;
            }

            >.invalid-message {
                font-size: 13px;
                color: #171819;
                font-weight: bold;
                margin-bottom: 7px;
            }
        }

        >.more-message {
            position: absolute;
            bottom: 7px;
            background-image: var(--more-bg-color);
            border: none;
            color: #fff;
            border-radius: 25px;
            line-height: 34px;
            font-size: 14px;
            padding: 0 20px;
            cursor: pointer;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    >footer {
        position: relative;
        display: flex;
        align-items: center;
        height: 44px;
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
        background-color: #fff;

        >input {
            flex: 1;
            border: none;
            height: 32px;
            background-color: #f0f1f2;
            color: #373839;
            border-radius: 14px;
            padding: 0 12px;
            // font-size: 14px;
            font-size: 1rem; // https://stackoverflow.com/questions/2989263/disable-auto-zoom-in-input-text-tag-safari-on-iphone
        }

        >button {
            padding: 0;
            cursor: pointer;
            background-color: transparent;
            border: none;
        }

        >.send {
            transform: translateX(-3px);
        }
    }
}

.emoji-button {
    width: 44px;
    height: 32px;
    background: url(/src/asset/image/components/chatroom-emoji.svg);
    background-repeat: no-repeat;
    background-position: 16px 50%;

    &[active="true"] {
        // background: url(/src/asset/image/components/chatroom-emoji-close.svg);
        background: var(--emoji-btn-active);
    }
}

.send-button {
    width: 40px;
    height: 32px;
    background-image: url(/src/asset/image/components/chatroom-send.svg);
    background-repeat: no-repeat;
    background-position: 50% 50%;

    &[active="true"] {
        background: var(--chatroom-send-active);
    }
}

.emoji-picker {
    position: absolute;
    height: 160px;
    width: 100%;
    top: 100%;
    left: 0;
}

.chatroom-normal {
    >footer {
        transition: transform 0.5s;
    }
}

.chatroom-normal.open-emoji-picker {
    >main {
        padding-bottom: 160px;
    }

    .more-message {
        bottom: 167px;
    }

    >footer {
        transform: translateY(-160px);
    }
}
</style>
