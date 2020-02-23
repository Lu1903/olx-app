import axios from 'axios';

export default {
  async getEverything() {
    const res = await axios.get('http://localhost:3000/everything');
    return res.data;
  },
  async getMine() {
    const res = await axios.get('http://localhost:3000/show_mine');
    return res.data;
  },
  async getOne(id) {
    const res = await axios.get(`http://localhost:3000/showone/${id}`);
    return res.data;
  },
  async delete(id) {
    const res = await axios.get(`http://localhost:3000/delete/${id}`);
    return res.data;
  },
};
