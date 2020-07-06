import axios from 'axios';

export const addAuthInterceptor = (token: string) => {
  axios.interceptors.request.handlers = [];
  axios.interceptors.request.use(function(config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};
