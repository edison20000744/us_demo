import { defineStore } from 'pinia';
import { useApis, useSettings } from '@us/utils';
import { ref, reactive, computed, watch } from 'vue';
import { StatisticsOccurrenceRate, TGMatchBetInfo_BetInfo, TgRecent_match } from '@us/proto/api';
import { GetMatchesRecentParams, GetStatisticsParams } from '@us/api';

export const useHomeStore = defineStore('homeStore', () => {

	const apis = useApis();
	const settings = useSettings();
	const timeKey = ref<GetMatchesRecentParams['timeKey']>('twelveHours');
	const activeMatchId = ref<number>();
	const activeMatch = computed(() => recentMatches.value.find(match => match.matchId === activeMatchId.value));
	const scoreParams = reactive({
		condition: 'thirtyMatches' as GetStatisticsParams['condition'],
		league: true,
		home: false,
		away: false,
		position: 0 as 0 | 1 | 2,
	});

	const hasPositionOption = computed(() => scoreParams.home !== scoreParams.away);
	const recentMatches = ref<TgRecent_match[]>([]);
	const score = ref<StatisticsOccurrenceRate>();
	const betInfo = ref<TGMatchBetInfo_BetInfo[]>([]);

	watch([timeKey, () => settings.language], async () => {
		recentMatches.value = await apis.getMatchesRecent({ timeKey: timeKey.value });
		if (!activeMatch.value && recentMatches.value.length) {
			activeMatchId.value = recentMatches.value[0].matchId;
		}
	}, { immediate: true, flush: 'post' });
	watch([activeMatch, scoreParams, () => settings.language], async () => {
		score.value = activeMatch.value ? await apis.getStatistics({
			condition: scoreParams.condition,
			leagueId: scoreParams.league ? activeMatch.value.leagueId : undefined,
			teamId1: scoreParams.home ? activeMatch.value.homeId : undefined,
			teamId2: scoreParams.away ? activeMatch.value.awayId : undefined,
			position: hasPositionOption.value ? scoreParams.position : undefined,
		}) : undefined
	}, { deep: true, flush: 'post' });
	watch(activeMatch, async () => {
		betInfo.value = activeMatch.value ? await apis.getMatchBetInfo(activeMatch.value.matchId) : [];
	}, { flush: 'post' });

	return {
		timeKey,
		recentMatches,
		activeMatchId,
		activeMatch,
		scoreParams,
		score,
		hasPositionOption,
		betInfo,
	};
});
