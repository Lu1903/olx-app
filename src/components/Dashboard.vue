<template>
  <div class="content">
    Witaj, {{data.name}}
    <ul id="database">
      <li v-for="item in database" v-bind:key="item.id">
        <div class="ad">
          <div class="title">{{item.title}}</div>
          <div class="type">{{item.type}}</div>
          <div class="description">{{item.description}}</div>
          <div class="price">{{item.price}}</div>
          <router-link :to="{name: 'ShowOne', params: {id: item.id}}">Zobacz</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import GoogleService from '@/Services/GoogleService';
import DatabaseService from '@/Services/DatabaseService';

export default {
  name: 'Dashboard',
  data() {
    return {
      data: {},
      database: {},
    };
  },
  created() {
    this.getData();
    this.getEverything();
  },
  methods: {
    async getData() {
      GoogleService.googleData()
        .then(
          ((event) => {
            console.log(event);
            this.$set(this, 'data', event);
          }),
        );
    },
    async getEverything() {
      DatabaseService.getEverything()
        .then(
          ((event) => {
            this.$set(this, 'database', event);
          }),
        );
    },
  },
};
</script>
<style>
  ul{
    list-style-type: none;
  }
  .ad{
    max-width: 1000px;
    background-color: #e1f2fb;
    margin: 20px auto;
    padding: 20px;
    border-radius: 30px;
  }
</style>
