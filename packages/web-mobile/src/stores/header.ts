import { defineStore } from 'pinia';
import { reactive, toRefs, ref } from 'vue';
import { useRouter } from 'vue-router';


export const useHeader = defineStore('header', () => {
	const router = useRouter()
	router.beforeEach((to, form) => {
		if (to.path != form.path) {
			state.title = ''
		}
	})
	const state = reactive({
		gameListShowAllMatch: false,
		openFilter: false,
		title: '',
		openInfo: false,
		openSort: false,
		openSide: false,
		showInfo: false,
		showFilter: false,
	});
	const indexSort = ref<"ASC" | "DESC">('ASC')

	return {
		...toRefs(state),
		indexSort
	}
});
