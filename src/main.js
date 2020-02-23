// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Home from '@/components/Home';
import Dashboard from '@/components/Dashboard';
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
// eslint-disable-next-line no-multi-assign
Vue.isLoggedIn = Vue.prototype.store = '';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, Home, Dashboard },
  template: '<App/>',
});
