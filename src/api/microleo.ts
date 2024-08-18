import axios, { AxiosRequestConfig } from 'axios';
import { MicroLeoResponse } from '../types';
import { LeoError } from '../models';

export const MicroLeoApi = axios.create({
  baseURL: 'https://micro-leo.udg.mx',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'LeoWrapper',
  },
  withCredentials: true,
});

export const fetchMicroLeo = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const { data } = await MicroLeoApi.request<MicroLeoResponse<T>>(config);

    const response = data.respuesta;
    return response;
  } catch (error) {
    throw new LeoError(error as Error);
  }
};
