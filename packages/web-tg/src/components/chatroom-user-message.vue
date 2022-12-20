<template>
    <div class="msg" :class="{ self: isSelf, 'show-off': data.msgType === 3 }">
        <img
            v-if="data.fromUser?.level !== undefined"
            :src="`/level/level_${data.fromUser.level}@3x.png`"
        />
        <span class="user-name">{{ data.fromUser?.userName }}</span>
        <span class="date">{{ dateText }}</span>
        <span class="text">
            <span>：</span>
            <span v-if="data.msgType === 1 || data.msgType === 3" v-html="msgText"></span>
            <img v-else-if="data.msgType === 2" :src="`${path}/${data.msgText}.png`" />
        </span>
    </div>
</template>

<script lang="ts" setup>
import { useDayJs } from '@us/utils';
import { computed } from 'vue';
import type { TgUserMessage } from './chatroom-tg.vue';
import { useSettings } from '@us/utils';
const settings = useSettings();
const dayjs = useDayJs();
const props = defineProps<{
    isSelf: boolean,
    data: TgUserMessage,
}>();

const msgText = computed(() => props.data.msgText.replaceAll('\n', '<br>'));
const dateText = computed(() => dayjs(props.data.createTime * 1000).format('HH:mm'));
const path = computed(() => {
    return !settings.zhCnFlag ? '/sticker/no_text/' : '/sticker/';
})
</script>

<style lang="scss" scoped>
.msg {
    gap: 8px;
    font-size: 13px;
    line-height: 1.4;
    font-weight: bold;
    padding: 5px;

    >img {
        vertical-align: middle;
        width: 37px;
        height: 18px;
    }

    >*+* {
        margin-left: 3px;
    }
}

.user-name {
    color: var(--userName-fontColor);
}

.date {
    color: #555657;
}

.self {
    // background-color: #ffe5e1;
    background: var(--userName-self-bg);
    border-radius: 5px;

    .user-name {
        // color: #cd7b7b;
        color: var(--userName-self-fontColor);
    }
}

.show-off {
    background-color: #fffce1;
    border-radius: 5px;
}

.text {
    color: #171819;

    img {
        width: 75px;
        height: 75px;
        vertical-align: top;
    }
}
</style>
