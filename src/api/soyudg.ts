import axios, { AxiosRequestConfig } from 'axios';
import { SoyUdgResponse } from '../types';
import { LeoError } from '../models';

export const SoyUdgApi = axios.create({
  baseURL: 'https://soyudg.udg.mx',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'LeoWrapper',
  },
  withCredentials: true,
});

export const fetchSoyUdg = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const { data } = await SoyUdgApi.request<SoyUdgResponse<T>>(config);
    const response = data.data;
    return response;
  } catch (error) {
    throw new LeoError(error as Error);
  }
};
