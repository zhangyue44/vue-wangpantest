import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import App from './App.vue'
Vue.use(ElementUI);
import './assets/css/base.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
