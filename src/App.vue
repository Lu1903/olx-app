<template>
  <div class="app">
    <!--<div class="nav">
      <router-link to="/">test</router-link>
      <router-link to="/about">about</router-link>
    </div>-->
    <router-view />
  </div>
</template>
<script>
import Home from '@/components/Home';
import Dashboard from '@/components/Dashboard';

export default {
  name: 'App',
  components: {
    Home, Dashboard,
  },
};
</script>
