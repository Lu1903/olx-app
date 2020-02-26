import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Dashboard from '@/components/Dashboard';
import Add from '@/components/Add';
import Show from '@/components/Show';
import ShowOne from '@/components/ShowOne';
import VueCookies from 'vue-cookies';
import GoogleService from '@/Services/GoogleService';

Vue.use(Router);
Vue.use(VueCookies);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      // eslint-disable-next-line no-use-before-define
      beforeEnter: (to, from, next) => { isLoggedIn(to, from, next); },
    },
    {
      path: '/add',
      name: 'Add new',
      component: Add,
      // eslint-disable-next-line no-use-before-define
      beforeEnter: (to, from, next) => { isLoggedIn(to, from, next); },
    },
    {
      path: '/show',
      name: 'Show',
      component: Show,
      // eslint-disable-next-line no-use-before-define
      beforeEnter: (to, from, next) => { isLoggedIn(to, from, next); },
    },
    {
      path: '/showone/:id',
      name: 'ShowOne',
      component: ShowOne,
      props: true,
      // eslint-disable-next-line no-use-before-define
      beforeEnter: (to, from, next) => { isLoggedIn(to, from, next); },
    },
  ],
});
async function isLoggedIn(to, from, next) {
  if (window.$cookies.get('jwt')) {
    await GoogleService.googleData()
      .then((response) => {
        localStorage.setItem('data', response);
        next();
      }).catch((error) => {
        throw (error);
      });
  } else {
    next('/');
  }
}
