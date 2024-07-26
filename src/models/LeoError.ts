import { AxiosError } from 'axios';

export default class LeoError extends Error {
  constructor(genericError: any) {
    let name = 'LeoError';
    let message = genericError.message;

    if (genericError instanceof AxiosError) {
      const { status, error, codigo, mensaje } = genericError.response?.data;
      message = `${status} ${error}`;
      if (status === undefined || error === undefined) {
        message = `${codigo} ${mensaje}`;
      }
    }

    super(message);
    this.name = name;
  }
}
