import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vu11j8c4kh.execute-api.sa-east-1.amazonaws.com/dev',
});

export default api;
