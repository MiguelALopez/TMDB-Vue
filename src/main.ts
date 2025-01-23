import './assets/main.css';

import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import Store from '@/store';

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.use(Store);

app.mount('#app');
