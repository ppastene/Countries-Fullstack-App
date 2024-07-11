import { createApp } from 'vue';
import Buefy from 'buefy';
import App from './App.vue'
import 'buefy/dist/buefy.css';

const app = createApp(App);
app.use({
  install: (app, options) => {
    app.config.globalProperties.$Buefy = Buefy;
    app.config.globalProperties.$buefyConfig = options;
  }
}, {});
app.mount('#app');