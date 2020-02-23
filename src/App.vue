<template>
  <div class="nav-wrapper" v-if="loggedIn">
    <router-link to="/">homepage</router-link>
    <router-link to="/dashboard">dashboard</router-link>
    <router-link to="/add">add new</router-link>
    <router-link to="/show">show mine</router-link>
    <button @click="logout()">Log Out</button>
    <div class="content"><router-view /></div>
  </div>
  <div v-else>
    <a v-bind:href="link">Login with Google</a>
    <div class="content"><router-view /></div>
  </div>
</template>
<script>
import Home from '@/components/Home';
import Dashboard from '@/components/Dashboard';
import Add from '@/components/Add';
import Show from '@/components/Show';
import GoogleService from '@/Services/GoogleService';
import 'materialize-css/dist/css/materialize.css';

export default {
  name: 'App',
  data() {
    return {
      link: {},
      loggedIn: false,
    };
  },
  created() {
    this.getLink();
    this.checkLogin();
  },
  methods: {
    async getLink() {
      GoogleService.getLink()
        .then(
          ((event) => {
            this.$set(this, 'link', event);
          }),
        );
    },
    async checkLogin() {
      if (window.$cookies.get('jwt')) {
        this.loggedIn = true;
      }
    },
    logout() {
      window.$cookies.remove('jwt');
      this.$router.go();
    },
  },
  components: {
    Home, Dashboard, Show, Add,
  },
};
</script>

<style>
</style>
