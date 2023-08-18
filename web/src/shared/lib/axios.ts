import axios from 'axios';

const instance: any = axios.create({
  baseURL: 'http://localhost:4444',
});

instance.interceptors.request.use((config: { headers: any }) => {
  config.headers!.Authorization = window.localStorage.getItem('token') || '';
  return config;
});

export default instance;
