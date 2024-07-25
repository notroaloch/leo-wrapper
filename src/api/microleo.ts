import axios, { RawAxiosRequestHeaders } from 'axios';

const MicroLeoAPI = axios.create({
  baseURL: 'https://micro-leo.udg.mx',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'LeoWrapper',
  } as RawAxiosRequestHeaders,
  timeout: 1000,
  withCredentials: true,
});

export default MicroLeoAPI;
