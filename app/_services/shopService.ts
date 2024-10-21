import { Axios, AxiosResponse } from 'axios';
import { axiosGet, IPaginationResponse, IResponseObject } from './baseService';
import { ShopHomeInfo } from '@/app/_components/home/ShopCard';
import { ShopCardResponse } from '../(app)/(public)/shops/page';

const baseUrl = process.env.NEXT_PUBLIC_USER_HOST;

export const getShops = (page: number, size: number = 5, q?:string | null): Promise<AxiosResponse<IResponseObject<IPaginationResponse<ShopCardResponse>>>> => {
  const query = `${baseUrl}/profiles?size=${size}&page=${page}`
  if (!q) {
    return axiosGet(query, '');
  }
  return axiosGet(query + `&q=${q}`, '');
}


export const getShop = (id: number) =>
  axiosGet(baseUrl + '/profiles/' + id, '');

export const getShopsOutstanding = (): Promise<AxiosResponse<IResponseObject<ShopHomeInfo[]>>> => 
  axiosGet(baseUrl + '/profiles/outstanding', '');