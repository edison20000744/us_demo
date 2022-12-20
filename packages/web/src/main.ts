import '@lottiefiles/lottie-player/dist/lottie-player';
import { createApp } from 'vue';
import App from './App.vue';
import { installCommon } from './installCommon'

const app = createApp(App);
app.use(installCommon);
app.mount('#app');

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        RouterLink: typeof import('vue-router')['RouterLink']
        RouterView: typeof import('vue-router')['RouterView']
    }
}
