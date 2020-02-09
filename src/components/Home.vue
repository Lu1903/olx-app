<template>
  <div class="home">
    <a v-bind:href="link">Login</a>
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
