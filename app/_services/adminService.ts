import { AxiosResponse } from 'axios';
import {axiosGet, axiosPatch, axiosPost, IPaginationResponse, IResponseObject} from './baseService';
import { Feedback } from '../(admin)/(admin)/admin/contact/page';
import { Business } from '../(admin)/(admin)/admin/dashboard/page';
export type UserAccountRowData = {
    id: number;
    username: string;
    fullName: string;
    email: string;
    createdDate: Date;
    status: boolean;
}

const baseUrl = process.env.NEXT_PUBLIC_SYSTEM_HOST;

var token: string | null = '';

if (typeof window !== 'undefined') {
  token = 'Bearer ' + localStorage?.getItem('accessToken');
}
export const getUserAccountManagement = ():Promise<AxiosResponse<IResponseObject<IPaginationResponse<UserAccountRowData>>>> => axiosGet(baseUrl + '/account-management/users', {headers: {Authorization: token}});
export const enableCustomerUser = (id: number):Promise<AxiosResponse<IResponseObject<UserAccountRowData>>> => axiosPatch(baseUrl + `/account-management/users/enable/${id}`, {}, {headers: {Authorization: token}});
export const disableCustomerUser = (id: number):Promise<AxiosResponse<IResponseObject<UserAccountRowData>>> => axiosPatch(baseUrl + `/account-management/users/disable/${id}`, {}, {headers: {Authorization: token}});
export const getSystemContact = (page: number, size: number, q?: string): Promise<AxiosResponse<IResponseObject<IPaginationResponse<Feedback>>>> => axiosGet(`${baseUrl}/contacts`, {headers: {Authorization: token}});
export const getBusinessManagement = (page: number, size: number, q?: string): Promise<AxiosResponse<IResponseObject<IPaginationResponse<Business>>>> => axiosGet(`${baseUrl}/business-management`, {headers: {Authorization: token}});