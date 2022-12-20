<template>
	<Index>
		<template #default>
			<div class="order" :class="{ open: openOrederBtn }">
				<button class="order_control" @click="openOrederBtn = true"></button>
				<button class="order_close" @click="openOrederBtn = false"></button>
				<button class="order_btn" @click="openOrderList()"></button>
			</div>

			<div class="sport" :class="{ open: openOrederBtn }">
				<button class="sport_btn" @click="thirdParty.openSiteList = true"></button>
			</div>
			<SiteList></SiteList>
		</template>
		<template #fallback>
			<UsLoading></UsLoading>
		</template>

		<template #popup>
			<Dialog></Dialog>
		</template>
	</Index>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue';
import Dialog from "@us/web-tg/components/dialog/index.vue";
import Index from "@us/web-tg/pages/tg-live/index.vue";
import { useThirdParty } from '@us/web-tg/stores/third-party';
import { useDialogs } from '@us/web-tg/stores/dialogs';
import { useSettings } from '@us/utils';
const SiteList = defineAsyncComponent(() => import("@us/web-tg/components/third-party/site-list.vue"));

const openOrederBtn = ref(false);
const thirdParty = useThirdParty();
const dialogsStore = useDialogs();
const settings = useSettings();

function openOrderList() {
	dialogsStore.openDialog('Step1')
}

</script>

<route lang="yaml">
meta:
  apiType: tg
</route>
