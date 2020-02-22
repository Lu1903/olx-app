<template>
  <div class="about">
    <div class="nav">
      <router-link to="/">homepage</router-link>
      <router-link to="/dashboard">dashboard</router-link>
      <router-link to="/add">add new</router-link>
      <router-link to="/show">show mine</router-link>
      {{link}}
    </div>
  </div>
</template>
<script>
import GoogleService from '@/Services/GoogleService';

export default {
  name: 'Dashboard',
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
      GoogleService.test()
        .then(
          ((event) => {
            this.$set(this, 'link', event);
          }),
        );
    },
  },
};
</script>
