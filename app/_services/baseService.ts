import axios from 'axios';

export interface IResponseObject<T> {
  content: T;
  code: string;
  message: string;
  success: boolean;
  requestTime: Date;
  status: string;
}

export interface IPaginationResponse<T> {
  content: T[];
  page: number;
  pageSize: number;
  totalResult: number;
  totalPage: number;
  firstPage: boolean;
  lastPage: boolean;
}
export const axiosGet = (url: string, config: any) => axios.get(url, config);

export const axiosPost = (url: string, data: any, config: any) =>
  axios.post(url, data, config);

export const axiosPut = (url: string, data: any, config: any) =>
  axios.put(url, data, config);

export const axiosDelete = (url: string, config: any) =>
  axios.delete(url, config);

export const axiosPatch = (url: string, data: any, config: any) =>
  axios.patch(url, data, config);