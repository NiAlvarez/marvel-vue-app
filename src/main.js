import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'animate.css';
import store from "./store";

import router from './router/router'

createApp(App).use(store).use(router).mount('#app')