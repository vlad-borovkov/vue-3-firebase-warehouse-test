import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import '@/assets/fonts/fonts.css'
import componentsUI from '@/components/UI/index.js';

const app = createApp(App)

componentsUI.forEach(element => {
    app.component(element.name, element)
});

app.use(router).use(createPinia()).mount('#app');
