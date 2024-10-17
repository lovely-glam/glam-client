import { axiosPost } from './baseService';

var token: string | null = '';

if (typeof window !== 'undefined') {
  token = 'Bearer ' + localStorage?.getItem('accessToken');
}

const baseUrl = process.env.NEXT_PUBLIC_USER_HOST;

export const bookService = (data: any) =>
  axiosPost(baseUrl + '/booking', data, { headers: { Authorization: token } });

export const pay = (data: any) =>
  axiosPost(baseUrl + '/payments/booking', data, {
    headers: { Authorization: token },
  });
