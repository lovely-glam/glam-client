import { axiosPost } from './baseService';

const baseUrl = process.env.NEXT_PUBLIC_AUTH_HOST;
console.log(baseUrl);

export const registerCustomer = (data: any) =>
  axiosPost(baseUrl + '/register/customer', data, '');

export const registerBusiness = (data: any) =>
  axiosPost(baseUrl + '/register/business', data, '');

export const loginCustomer = (data: any) =>
  axiosPost(baseUrl + '/auth/customer/local', data, '');

export const loginBusiness = (data: any) =>
  axiosPost(baseUrl + '/auth/nailer', data, '');
