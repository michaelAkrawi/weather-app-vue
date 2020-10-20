import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from "./router"
import { store } from "../src/store/store";
import Notifications from 'vue-notification';
import VueCompositionAPI from '@vue/composition-api'


Vue.config.productionTip = false
Vue.use(Notifications);
Vue.use(VueCompositionAPI);

Vue.config.errorHandler = (err, vm) => {
  vm.$notify({
    group: "alerts",
    title: "Ooops",
    text: 'Something went wrong',
    type: "error"
  });
  console.error(err);
}

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
