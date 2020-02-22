<template>
  <div class="home">
    <a v-bind:href="link">Login</a>
    <div class="nav">
      <router-link to="/">homepage</router-link>
      <router-link to="/dashboard">dashboard</router-link>
      <router-link to="/add">add new</router-link>
      <router-link to="/show">show mine</router-link>
    </div>
  </div>
</template>

<script>
import GoogleService from '@/Services/GoogleService';

export default {
  name: 'Home',
  data() {
    return {
      link: {},
    };
  },
  created() {
    this.getLink();
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
  },
};
</script>
<style scoped>

</style>
