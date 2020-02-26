<template>
  <div class="home">
    <div v-bind="one">
      <div class="title">{{one.title}}</div>
      <div class="type">{{one.type}}</div>
      <div class="description">{{one.description}}</div>
      <div class="price">{{one.price}}</div>
      <div class="email"><a :href="`mailto:${one.email}`">{{one.email}}</a></div>
    </div>
  </div>
</template>

<script>
import DatabaseService from '@/Services/DatabaseService';

export default {
  name: 'Show',
  data() {
    return {
      one: {},
      id: 0,
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getOne(this.id);
  },
  methods: {
    async getOne(id) {
      DatabaseService.getOne(id)
        .then(
          ((event) => {
            this.$set(this, 'one', event);
          }),
        );
    },
  },
};
</script>
<style scoped>

</style>
