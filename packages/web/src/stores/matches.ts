import { defineStore } from 'pinia';
import type * as SocketProtos from '@us/proto/socket';
import { useApis, useDayJs, useSettings } from '@us/utils';
import { reactive, watch } from 'vue';
import { usePlatform } from '@us/utils';

export type Match = SocketProtos.MatchData;
export type Area = SocketProtos.Area;

export const useMatches = defineStore('matches', () => {

	let lastDate: string | undefined;

	const platform = usePlatform();
	const dayjs = useDayJs();
	const fatchedDates = reactive<Record<string, boolean>>({});
	const allMatches = reactive<Record<number, Match>>({});
	const allAreas = reactive<Record<string, SocketProtos.Area[]>>({});

	const apis = useApis();

	apis.onReconnect(refresh);
	apis.onMatchUpdate(handle => {
		const oldMatch = allMatches[handle.matchId];
		if (oldMatch) {
			allMatches[handle.matchId] = {
				...oldMatch,
				...handle,
			};
		}
	});
	apis.onNewMatches(handle => {
		for (const newMatch of handle.matches) {
			allMatches[newMatch.matchId] = newMatch;
		}
	});
	apis.onDeleteMatches(handle => {
		for (const deleteMatchId of handle.matchIds) {
			delete allMatches[deleteMatchId];
		}
	});

	const settings = useSettings();

	watch(() => settings.language, refresh, { flush: 'post' });

	return {
		fatchedDates,
		matches: allMatches,
		areas: allAreas,
		fetch,
		clear,
	};

	function refresh() {
		clear();
		if (lastDate) {
			fetch(lastDate);
		}
	}
	function clear() {
		for (let date in fatchedDates) {
			delete fatchedDates[date];
		}
	}
	async function fetch(_date: string) {
		if (fatchedDates[_date] === undefined) {
			fatchedDates[_date] = false;
			const matchesList = await apis.getMatchesList({ date: dayjs(_date, 'YYYYMMDD').valueOf() / 1000, isStatistics: platform.value === 'desktop' ? 1 : 0 });
			for (const match of matchesList.matches) {
				allMatches[match.matchId] = match;
			}
			fatchedDates[_date] = true;
			allAreas[_date] = matchesList.areas;
		}
		lastDate = _date;
	}
});
