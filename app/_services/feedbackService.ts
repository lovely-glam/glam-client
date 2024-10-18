import { AxiosResponse } from "axios";
import { axiosPost, axiosGet, IResponseObject } from "./baseService";

const baseUrl = process.env.NEXT_PUBLIC_USER_HOST;

export const getShopsOutstanding = (): Promise<AxiosResponse<IResponseObject<[]>>> => 
    axiosGet(baseUrl + '/feedbacks/home', '');