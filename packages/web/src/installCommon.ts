import { App } from 'vue';
import { installApis } from '@us/web/plugins/apis';
import { setupLayouts } from 'layouts-generated';
import generatedRoutes from 'pages-generated';
import { createRouter, createWebHistory } from 'vue-router';
import { version } from '../package.json';
import { installGlobalComponents } from '@us/web/installGlobalComponents';
import { createPinia } from 'pinia'
import { useBaidu } from '@us/utils';
import Previewer from 'virtual:vue-component-preview';
import 'default-passive-events';

console.log('version:', version);
const webHistory = createWebHistory(import.meta.env.BASE_URL);
const routes = setupLayouts(generatedRoutes);
const router = createRouter({
	history: webHistory,
	routes,
	scrollBehavior: (newRoute, oldRoute, savedPosition) => {
		if (newRoute.path !== oldRoute.path) {
			return { top: 0 };
		}
	},
});
export function installCommon(app: App) {
	app.use(createPinia())
	app.use(installApis);
	app.use(router);
	app.use(installGlobalComponents);
	app.use(Previewer);
	useBaidu().main(router);
}
