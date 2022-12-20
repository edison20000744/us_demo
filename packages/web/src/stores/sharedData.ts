import { defineStore } from 'pinia';
import { useApis, useSettings } from '@us/utils';
import { Ref, computed, shallowRef } from 'vue';
import { apiComputed } from '@us/shared';

export const useSharedData = defineStore('sharedData', () => {

	const apis = useApis();
	const settings = useSettings();
	const homeInfo = computed(() => {
		settings.language; // watch language change
		return apis.getHomeInfo();
	});
	const areasList = computed(() => {
		settings.language; // watch language change
		return apis.getAreasList();
	});
	const qrcode = computed(() => {
		settings.language; // watch language change
		return apis.getSystem();
	});
	const newsList = (page: Ref<number>) => apiComputed(apis.getNewsList, () => [{ page: page.value + 1 }] as const);

	const newsBanner = computed(() => {
		settings.language; // watch language change
		return apis.getNewsBanner();
	});
	const temporaryPlayerMatch = shallowRef<{
		matchId: number,
		liveStreamings: any[],
		status: number,
	}>();

	return {
		homeInfo,
		areasList,
		qrcode,
		newsList,
		newsBanner,
		temporaryPlayerMatch,
	};
});
