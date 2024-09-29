import axios from 'axios';

export const axiosGet = (url: string, config: any) => axios.get(url, config);

export const axiosPost = (url: string, data: any, config: any) =>
  axios.post(url, data, config);

export const axiosDelete = (url: string, config: any) =>
  axios.delete(url, config);
