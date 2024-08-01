import axios, {
  RawAxiosRequestHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { MicroLeoResponse } from '../types';
import LeoError from '../models/LeoError';

const MicroLeoAPI = axios.create({
  baseURL: 'https://micro-leo.udg.mx',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'LeoWrapper',
  } as RawAxiosRequestHeaders,
  withCredentials: true,
});

export const fetch = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const { data }: AxiosResponse<MicroLeoResponse> = await MicroLeoAPI.request(
      config
    );

    const response = data.respuesta as T;
    return response;
  } catch (error) {
    throw new LeoError(error);
  }
};

export default MicroLeoAPI;
