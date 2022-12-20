import '@lottiefiles/lottie-player/dist/lottie-player';
import { createApp } from 'vue';
import App from './App.vue';
import { installCommon } from '@us/web/installCommon'
const app = createApp(App);
app.use(installCommon);
app.mount('#app');
