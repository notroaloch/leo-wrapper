import axios, {
  RawAxiosRequestHeaders,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { MicroLeoResponse, SoyUdeGResponse } from '../types';
import LeoError from '../models/LeoError';

const SoyUdeGAPI = axios.create({
  baseURL: 'https://soyudg.udg.mx',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'LeoWrapper',
  } as RawAxiosRequestHeaders,
  withCredentials: true,
});

export const fetchSoyUDG = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const { data }: AxiosResponse<SoyUdeGResponse> = await SoyUdeGAPI.request(
      config
    );

    const response = data.data as T;
    return response;
  } catch (error) {
    throw new LeoError(error);
  }
};

export default SoyUdeGAPI;
