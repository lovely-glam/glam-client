import { axiosGet, axiosPost } from './baseService';

var token: string | null = '';

if (typeof window !== 'undefined') {
  token = localStorage?.getItem('accessToken');
}

const baseUrl = process.env.NEXT_PUBLIC_USER_HOST;

export const getCurrentUser = () =>
  axiosGet(baseUrl + '/profiles/me', { headers: { Authorization: token } });
