<template>
  <div class="home">
    <a v-bind:href="event">Login</a>
  </div>
</template>

<script>
import EventService from '@/Services/EventService';

export default {
  name: 'Home',
  data() {
    return {
      event: {},
    };
  },
  created() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      EventService.getEvents()
        .then(
          ((event) => {
            this.$set(this, 'event', event);
          }),
        );
    },
  },
};
</script>
<style scoped>

</style>
