import type { App } from 'vue';
import UsTabs from './components/global/tabs.vue';
import UsTabPane from './components/global/tab-pane.vue';
import UsContainer from './components/global/container.vue';
import UsRadio from './components/global/radio.vue';
import UsScrollbar from './components/global/scrollbar.vue';
import UsCheckbox from './components/global/checkbox.vue';
import UsInputText from './components/global/inputText.vue';
import UsSelect from './components/global/select.vue';
import UsSlider from './components/global/slider.vue';
import UsSwitch from './components/global/switch.vue';
import UsButton from './components/global/button.vue';
import UsRange from './components/global/range.vue';
import UsDropdown from './components/global/dropdown.vue';
import UsLoading from './components/global/loading.vue';
import UsPopup from './components/global/popup.vue';
import NewsImg from './components/global/news-img.vue';
import HonorImg from './components/global/honor-img.vue';
import UsNoData from './components/global/no-data.vue';

export function installGlobalComponents(app: App) {
	app.component('UsTabs', UsTabs);
	app.component('UsTabPane', UsTabPane);
	app.component('UsContainer', UsContainer);
	app.component('UsRadio', UsRadio);
	app.component('UsScrollbar', UsScrollbar);
	app.component('UsCheckbox', UsCheckbox);
	app.component('UsInputText', UsInputText);
	app.component('UsSelect', UsSelect);
	app.component('UsSlider', UsSlider);
	app.component('UsSwitch', UsSwitch);
	app.component('UsButton', UsButton);
	app.component('UsRange', UsRange);
	app.component('UsDropdown', UsDropdown);
	app.component('UsLoading', UsLoading);
	app.component('UsPopup', UsPopup);
	app.component('NewsImg', NewsImg);
	app.component('HonorImg', HonorImg);
	app.component('UsNoData', UsNoData);
}

declare module '@vue/runtime-core' {
	export interface GlobalComponents {
		UsTabs: typeof UsTabs;
		UsTabPane: typeof UsTabPane;
		UsContainer: typeof UsContainer;
		UsRadio: typeof UsRadio;
		UsScrollbar: typeof UsScrollbar;
		UsCheckbox: typeof UsCheckbox;
		UsInputText: typeof UsInputText;
		UsSelect: typeof UsSelect;
		UsSlider: typeof UsSlider;
		UsSwitch: typeof UsSwitch;
		UsButton: typeof UsButton;
		UsRange: typeof UsRange;
		UsDropdown: typeof UsDropdown;
		UsLoading: typeof UsLoading;
		UsPopup: typeof UsPopup;
		NewsImg: typeof NewsImg;
		HonorImg: typeof HonorImg;
		UsNoData: typeof UsNoData;
	}
}
