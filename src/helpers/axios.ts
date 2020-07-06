import axios from 'axios';

export const addAuthInterceptor = (token: string) => {
  // @ts-ignore - reset the array of interceptors
  axios.interceptors.request.handlers = [];
  axios.interceptors.request.use(function(config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};
