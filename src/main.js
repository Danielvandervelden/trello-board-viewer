import { createApp } from 'vue'
import App from './App.vue'

/** Icons */
import Unicon from 'vue-unicons';
import { uniComment, uniPaperclip, uniCheckSquare, uniSchedule, uniArrowLeft } from 'vue-unicons/dist/icons';

Unicon.add([uniComment ,uniPaperclip, uniCheckSquare, uniSchedule, uniArrowLeft]);

const app = createApp(App).use(Unicon);
app.config.globalProperties.API_KEY = 'eede283cb6d5d679de66c727328dd384';
app.config.globalProperties.API_URL = 'https://api.trello.com/1';

app.mount('#app');

