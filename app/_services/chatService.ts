import { AxiosResponse } from 'axios';
import { axiosPost, IResponseObject } from './baseService';

var token: string | null = '';

if (typeof window !== 'undefined') {
  token = 'Bearer ' + localStorage?.getItem('accessToken');
}

const baseUrl = process.env.NEXT_PUBLIC_WEBSOCKET_HOST;

export type ChatRoom = {
    id: number;
    shopId: number;
    userId: number;
    roomName: string;
}


export const getRoomsByShopId = (shopProfileId: number): Promise<AxiosResponse<IResponseObject<ChatRoom>>> =>
  axiosPost(baseUrl + `/rooms/${shopProfileId}`, {}, { headers: { Authorization: token } });