<template>
  <div class="home">
    <form @submit="submit" method="post">
      <label for="title">Wpisz tytuł:</label>
      <input id="title" type="text" v-model="title">
      <label for="types">Wybierz rodzaj ogłoszenia:</label>
      <select id="types" name="typeList" form="typeform" v-model="type">
        <option value="sell">Sprzedam</option>
        <option value="buy">Kupię</option>
        <option value="giveaway">Oddam</option>
        <option value="lend">Wypożyczę</option>
      </select>
      <label for="description">Wpisz opis:</label>
      <input id="description" type="text" v-model="description">
      <label for="file-input">Wybierz zdjęcie:</label>
      <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input">
      <label for="price">Wpisz cenę:</label>
      <input id="price" type="number" v-model="price">
      <button type="submit" class="button is-danger">Submit</button>
    </form>
    <div id="preview">
      <img v-if="url" :src="url" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Add',
  data() {
    return {
      title: '',
      type: '',
      description: '',
      fileinput: '',
      price: '',
      url: '',
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();
      axios.post('http://localhost:3000/user', {
        title: this.title,
        type: this.type,
        description: this.description,
        fileinput: this.fileinput,
        price: this.price,
      })
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);
        }).catch((error) => {
        // eslint-disable-next-line no-console
          console.log(error);
        });
    },
    uploadImage(event) {
      const data = new FormData();
      data.append('name', 'my-picture');
      data.append('file', event.target.files[0]);
      this.fileinput = event.target.files[0];
      this.url = URL.createObjectURL(this.fileinput);
    },
  },
};
</script>
<style scoped>

</style>
