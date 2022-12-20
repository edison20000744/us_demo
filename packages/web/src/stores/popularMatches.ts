import { defineStore } from 'pinia';
import { useApis, useSettings } from '@us/utils';
import { ref, onUnmounted, watch } from 'vue';
import { PopularMatches_PopularMatch } from '@us/proto/socket';

export const usePopularMatches = defineStore('popularMatches', () => {

	let outdated = true;
	let watchers = 0;

	const apis = useApis();
	const settings = useSettings();
	const data = ref<PopularMatches_PopularMatch[]>([]);

	apis.onReconnect(onOutdated);
	apis.onPopularMatches(handle => {
		data.value = handle.matches;
		outdated = false;
	});

	watch(() => settings.language, onOutdated);

	return {
		use,
	};

	async function onOutdated() {
		if (watchers >= 1) {
			data.value = await apis.getPopularMatches();
		}
		else {
			outdated = true;
		}
	}
	async function use() {

		watchers++;
		onUnmounted(() => {
			watchers--;
		});

		if (outdated) {
			outdated = false;
			data.value = await apis.getPopularMatches();
		}

		return data;
	}
});
