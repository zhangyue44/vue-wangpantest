import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import App from './App.vue'
Vue.use(ElementUI);
import './assets/css/base.css'

console.log(4444444);
console.log(555555);
console.log(6666);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
