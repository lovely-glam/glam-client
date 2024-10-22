import { AxiosResponse } from 'axios';
import { Booking } from '../(app)/(customer)/booking/page';
import { axiosGet, axiosPost, axiosPut, IPaginationResponse, IResponseObject } from './baseService';

var token: string | null = '';

if (typeof window !== 'undefined') {
  token = 'Bearer ' + localStorage?.getItem('accessToken');
}

const baseUrl = process.env.NEXT_PUBLIC_USER_HOST;

export const getCurrentUser = () =>
  axiosGet(baseUrl + '/profiles/me', { headers: { Authorization: token } });

export const updateUser = (data: any) =>
  axiosPut(baseUrl + '/profiles', data, { headers: { Authorization: token } });

export const getUserBookings = (page: number, size: number = 5, q?:string): Promise<AxiosResponse<IResponseObject<IPaginationResponse<Booking>>>> => {
  const base = `${baseUrl}/booking/get-by-user?page=${page}&size=${size}`;
  if (!q) {
    return axiosGet(base, {headers: { Authorization: token }});
  }
  return axiosGet(base + `&q=${q}`,{headers: { Authorization: token }});
}
