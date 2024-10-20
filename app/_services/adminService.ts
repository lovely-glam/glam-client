import { AxiosResponse } from 'axios';
import {axiosGet, IPaginationResponse, IResponseObject} from './baseService';
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