import { AxiosResponse } from "axios";
import { axiosPost, axiosGet, IResponseObject } from "./baseService";
import { FeedbackResponse } from "../_components/home/Review";

const baseUrl = process.env.NEXT_PUBLIC_USER_HOST;

export const getShopFeedbackHome = (): Promise<AxiosResponse<IResponseObject<FeedbackResponse[]>>> => 
    axiosGet(baseUrl + '/feedbacks/home', '');