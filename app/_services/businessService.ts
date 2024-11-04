import { Axios, AxiosResponse } from "axios";
import { axiosGet, axiosPost, axiosPut, IResponseObject } from "./baseService";
import { NailProfileDetailResponse } from "@/app/(admin)/(business)/business/profile/page"
import { ServiceModel } from "../_components/business/ServiceModal";

const baseUrl = process.env.NEXT_PUBLIC_BUSINESS_HOST;

var token: string | null = '';

if (typeof window !== 'undefined') {
  token = 'Bearer ' + localStorage?.getItem('accessToken');
}
export const getProfiles = ():Promise<AxiosResponse<IResponseObject<NailProfileDetailResponse>>> => axiosGet(baseUrl + '/profiles/me', {headers: {Authorization: token}});

export const updateProfileService = (data: ServiceModel): Promise<AxiosResponse<IResponseObject<NailProfileDetailResponse>>> => axiosPut(baseUrl + `/nail-services/${data.id}`, (({id, ...restData }) => restData)(data), {headers: {Authorization: token}});

export const createProfileService = (data: ServiceModel): Promise<AxiosResponse<IResponseObject<NailProfileDetailResponse>>> => axiosPost(baseUrl + `/nail-services`, (({id, ...restData }) => restData)(data), {headers: {Authorization: token}});

export const submitSubscriptionPlan = (data: {subscriptionRole: "BASIC" | "PREMIUM";callbackUrl: string; type: "PAY_OS"|"VN_PAY"}): Promise<AxiosResponse<IResponseObject<{paymentUrl: string}>>> => axiosPost(baseUrl + '/payments/subscription',data, {headers: {Authorization: token}});