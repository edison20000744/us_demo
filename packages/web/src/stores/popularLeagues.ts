import { defineStore } from 'pinia';
import { useApis, useSettings } from '@us/utils';
import { ref, watch, reactive, onUnmounted } from 'vue';
import { PopularLeagueMatches_Match, PopularLeagues_League } from '@us/proto/api';

export const usePopularLeagues = defineStore('popularLeagues', () => {

	let outdated = true;
	let watchers = 0;

	const apis = useApis();
	const settings = useSettings();
	const leagues = ref<PopularLeagues_League[]>([]);
	const seasonMatches: Record<number, Promise<PopularLeagueMatches_Match[]>> = reactive({});

	apis.onReconnect(onOutdated);

	watch(() => settings.language, onOutdated);

	return {
		use,
	};

	async function onOutdated() {
		if (watchers >= 1) {
			leagues.value = await apis.getPopularLeagues();
		}
		else {
			outdated = true;
		}
		for (let k in seasonMatches) {
			delete seasonMatches[k];
		}
	}
	async function use() {

		const seasonId = ref<number>();
		const matches = ref<PopularLeagueMatches_Match[]>([]);

		watch(seasonId, onSeasonIdUpdate, { flush: 'post' });

		watchers++;
		onUnmounted(() => {
			watchers--;
		});

		if (outdated) {
			outdated = false;
			leagues.value = await apis.getPopularLeagues();
		}

		if (leagues.value.length) {
			seasonId.value = leagues.value[0].seasonId;
			await onSeasonIdUpdate();
		}

		return {
			leagues,
			seasonId,
			matches,
		};

		async function onSeasonIdUpdate() {
			if (seasonId.value !== undefined) {
				if (!seasonMatches[seasonId.value]) {
					seasonMatches[seasonId.value] = apis.getPopularLeaguesMatches(seasonId.value);
				}
				matches.value = await seasonMatches[seasonId.value];
			}
		}
	}
});
