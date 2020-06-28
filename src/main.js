import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';

import toast from "./components/common/toast";

Vue.config.productionTip = false;
//事件总线$bus
Vue.prototype.$bus = new Vue();
Vue.use(toast);
//解决移动端延迟300ms的问题
FastClick.attach(document.body);

//使用图片懒加载
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
