import { Axios, AxiosResponse } from 'axios';
import { axiosGet, IPaginationResponse, IResponseObject } from './baseService';
import { ShopHomeInfo } from '@/app/_components/home/ShopCard';
import { ShopCardResponse } from '../(app)/(public)/shops/page';

const baseUrl = process.env.NEXT_PUBLIC_USER_HOST;

export const getShops = (page: number): Promise<AxiosResponse<IResponseObject<IPaginationResponse<ShopCardResponse>>>> =>
  axiosGet(baseUrl + '/profiles?size=5&page=' + page, '');

export const getShop = (id: number) =>
  axiosGet(baseUrl + '/profiles/' + id, '');

export const getShopsOutstanding = (): Promise<AxiosResponse<IResponseObject<ShopHomeInfo[]>>> => 
  axiosGet(baseUrl + '/profiles/outstanding', '');