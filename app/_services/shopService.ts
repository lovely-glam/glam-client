import { axiosGet, axiosPost } from './baseService';

const baseUrl = process.env.NEXT_PUBLIC_USER_HOST;

export const getShops = (page: number) =>
  axiosGet(baseUrl + '/profiles?size=10&page=' + page, '');
