import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://milezgrand.site/api',
});

instance.interceptors.request.use((config) => {
  config.headers!.Authorization = window.localStorage.getItem('token') || '';
  return config;
});

export default instance;
