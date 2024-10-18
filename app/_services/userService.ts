import { axiosGet, axiosPost, axiosPut } from './baseService';

var token: string | null = '';

if (typeof window !== 'undefined') {
  token = 'Bearer ' + localStorage?.getItem('accessToken');
}

const baseUrl = process.env.NEXT_PUBLIC_USER_HOST;

export const getCurrentUser = () =>
  axiosGet(baseUrl + '/profiles/me', { headers: { Authorization: token } });

export const updateUser = (data: any) =>
  axiosPut(baseUrl + '/profiles', data, { headers: { Authorization: token } });
