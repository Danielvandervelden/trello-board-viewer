import { createApp } from 'vue'
import App from './App.vue'



const app = createApp(App);

app.config.globalProperties.API_KEY = 'eede283cb6d5d679de66c727328dd384';
app.config.globalProperties.API_URL = 'https://api.trello.com/1';

app.mount('#app');

