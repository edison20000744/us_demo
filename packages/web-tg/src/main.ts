import '@lottiefiles/lottie-player/dist/lottie-player';
import { installApis } from './plugins/apis';
import { setupLayouts } from 'layouts-generated';
import generatedRoutes from 'pages-generated';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import { version } from '../package.json';
import { installGlobalComponents } from '@us/web/installGlobalComponents';
import { createPinia } from 'pinia'
import { useI18n } from '@us/locales/tg';

console.log('version:', version);

const webHistory = createWebHistory(import.meta.env.BASE_URL);
const routes = setupLayouts(generatedRoutes);
const router = createRouter({
    history: webHistory,
    routes,
});

const app = createApp(App);
app.use(createPinia())
app.use(installApis);
app.use(router);
app.use(installGlobalComponents);
app.mount('#app');