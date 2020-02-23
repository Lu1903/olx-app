import axios from 'axios';

export default {
  async getLink() {
    /* await axios.get('http://localhost:3000/link')
      .then(response => response.data)
      .catch((error) => {
        throw error;
      }); */
    const res = await axios.get('http://localhost:3000/link');
    return res.data;
  },
  async googleData() {
    const res = await axios.get('http://localhost:3000/GoogleData'); // , { withCredentials: true });
    return res.data;
  },
};
