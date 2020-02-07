import axios from 'axios';

export default {
  async getEvents() {
    const res = await axios.get('http://localhost:3000/link');
    return res.data;
  },
};
