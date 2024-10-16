import axios from 'axios';

export interface IResponseObject<T> {
  content: T;
  code: string;
  message: string;
  isSuccess: boolean;
  requestTime: Date;
  status: string;
}
export const axiosGet = (url: string, config: any) => axios.get(url, config);

export const axiosPost = (url: string, data: any, config: any) =>
  axios.post(url, data, config);

export const axiosDelete = (url: string, config: any) =>
  axios.delete(url, config);
