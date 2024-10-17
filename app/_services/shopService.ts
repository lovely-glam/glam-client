import { Axios, AxiosResponse } from 'axios';
import { axiosGet, IResponseObject } from './baseService';
import { ShopHomeInfo } from '@/app/_components/home/ShopCard';

const baseUrl = process.env.NEXT_PUBLIC_USER_HOST;

export const getShops = (page: number) =>
  axiosGet(baseUrl + '/profiles?size=5&page=' + page, '');

export const getShop = (id: number) =>
  axiosGet(baseUrl + '/profiles/' + id, '');

export const getShopsOutstanding = (): Promise<AxiosResponse<IResponseObject<ShopHomeInfo[]>>> => 
  axiosGet(baseUrl + '/profiles/outstanding', '');