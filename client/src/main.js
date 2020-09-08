import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/router/permission"

import BaseComponent from "@/components/index"

Vue.config.productionTip = false;

Vue.use(BaseComponent);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
