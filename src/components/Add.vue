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
      <button type="submit" class="btn waves-effect waves-light">Submit</button>
    </form>
    <div id="preview">
      <img v-if="url" :src="url" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import GoogleService from '@/Services/GoogleService';
import 'materialize-css/dist/css/materialize.css';

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
      email: '',
    };
  },
  created() {
    this.getData();
  },
  methods: {
    submit(e) {
      e.preventDefault();
      axios.post('http://localhost:3000/addnew', {
        title: this.title,
        type: this.type,
        description: this.description,
        fileinput: this.fileinput,
        price: this.price,
        email: this.email,
      })
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);
        }).catch((error) => {
        // eslint-disable-next-line no-console
          console.log(error);
        });
      this.title = '';
      this.type = '';
      this.description = '';
      this.fileinput = '';
      this.price = '';
      this.url = '';
    },
    uploadImage(event) {
      const data = new FormData();
      data.append('name', 'my-picture');
      data.append('file', event.target.files[0]);
      this.fileinput = event.target.files[0];
      this.url = URL.createObjectURL(this.fileinput);
    },
    async getData() {
      GoogleService.googleData()
        .then(
          ((event) => {
            this.$set(this, 'email', event.email);
          }),
        );
    },
  },
};
</script>
<style scoped>
  .home{
    max-width: 500px;
    margin: auto;
  }
  input, label{
    display: block;
    margin: 10px 0;
  }
  label{
    font-size: 20px;
  }
</style>
