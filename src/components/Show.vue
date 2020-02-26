<template>
  <div class="home">
    Moje ogłoszenia:
    <div class="ads" v-if="database!==null">
      <ul id="database">
        <li v-for="item in database" v-bind:key="item.id">
          <div class="ad">
            <div class="title">{{item.title}}</div>
            <div class="type">{{item.type}}</div>
            <div class="description">{{item.description}}</div>
            <div class="price">{{item.price}}</div>
            <button @click="fireDelete(item.id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="noads">No advertisements</div>
  </div>
</template>

<script>
import DatabaseService from '@/Services/DatabaseService';

export default {
  name: 'Show',
  data() {
    return {
      database: {},
    };
  },
  created() {
    this.getMinee();
  },
  methods: {
    async getMinee() {
      DatabaseService.getMine()
        .then(
          ((event) => {
            this.$set(this, 'database', event);
          }),
        );
    },
    fireDelete(id) {
      DatabaseService.delete(id)
        .then(this.$router.go());
    },
  },
};
</script>
<style scoped>

</style>
