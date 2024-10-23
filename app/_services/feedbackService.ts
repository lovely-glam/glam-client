import { AxiosResponse } from "axios";
import { axiosPost, axiosGet, IResponseObject } from "./baseService";
import { FeedbackResponse } from "../_components/home/Review";

const baseUrl = process.env.NEXT_PUBLIC_USER_HOST;

var token: string | null = '';

if (typeof window !== 'undefined') {
    token = 'Bearer ' + localStorage?.getItem('accessToken');
}

export const getShopFeedbackHome = (): Promise<AxiosResponse<IResponseObject<FeedbackResponse[]>>> =>
    axiosGet(baseUrl + '/feedbacks/home', '');

export const sendServiceFeedback = (data: { bookId: number, comment: string, vote: number }) => axiosPost(`${baseUrl}/feedbacks`, data, { headers: { Authorization: token } });
