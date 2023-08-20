/** @format */

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import mitt from "mitt";
const emitter = mitt();

import "./css/main.css";

const app = createApp(App);

app.use(router);

app.config.globalProperties.emitter = emitter;

app.mount("#app");
