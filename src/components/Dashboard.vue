<template>
  <div class="about">
    <div class="nav">
      <router-link to="/">homepage</router-link>
      <router-link to="/dashboard">dashboard</router-link>
      <router-link to="/add">add new</router-link>
      <router-link to="/show">show mine</router-link>
    </div>
    {{cokies}}
  </div>
</template>
<script>
import GoogleService from '@/Services/GoogleService';

export default {
  name: 'Dashboard',
  data() {
    return {
      cokies: {},
    };
  },
  created() {
    this.getCooookie();
  },
  methods: {
    async getCooookie() {
      GoogleService.test().then(
        ((event) => {
          this.$set(this, 'cokies', event);
        }),
      );
    },
  },
};
</script>
