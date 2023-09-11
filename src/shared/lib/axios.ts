import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://82.146.54.93:8080',
});

instance.interceptors.request.use((config) => {
  config.headers!.Authorization = window.localStorage.getItem('token') || '';
  return config;
});

export default instance;
