import { axiosGet, axiosPost } from './baseService';

var token: string | null = '';

if (typeof window !== 'undefined') {
  token = 'Bearer ' + localStorage?.getItem('accessToken');
}

const baseUrl = process.env.NEXT_PUBLIC_WORKER_HOST;

export const uploadFile = (file: any) =>
  axiosPost(baseUrl + '/files/upload', file, {
    headers: { Authorization: token },
  });
