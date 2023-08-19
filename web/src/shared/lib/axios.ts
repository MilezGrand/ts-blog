import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:4444',
});

instance.interceptors.request.use((config) => {
  config.headers!.Authorization = window.localStorage.getItem('token') || '';
  return config;
});

export default instance;
