
import { AxiosResponse } from "axios";
import { axiosGet, axiosPost, axiosPut, IResponseObject } from "./baseService";
import { RoomResponse } from "../(admin)/(business)/business/chat/layout";
const baseUrl = process.env.NEXT_PUBLIC_WEBSOCKET_HOST;

var token: string | null = '';

if (typeof window !== 'undefined') {
  token = 'Bearer ' + localStorage?.getItem('accessToken');
}

export const getRooms = ():Promise<AxiosResponse<IResponseObject<RoomResponse[]>>> => axiosGet(baseUrl + '/rooms', {headers: {Authorization: token}});