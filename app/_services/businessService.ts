import { axiosGet } from './baseService';

const baseUrl = process.env.NEXT_PUBLIC_BUSINESS_HOST;

export const getCurrentShop = (token: string) =>
  axiosGet(baseUrl + '/profiles/me', {
    headers: { Authorization: 'Bearer ' + token },
  });
