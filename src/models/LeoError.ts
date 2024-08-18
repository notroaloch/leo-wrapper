import { AxiosError } from 'axios';

export class LeoError extends Error {
  constructor(genericError: Error) {
    const name = 'LeoError';
    let message = genericError.message;

    if (genericError instanceof AxiosError) {
      const { status, error, codigo, mensaje } = genericError.response!.data;
      message = `${status} ${error}`;
      if (status === undefined || error === undefined) {
        message = `${codigo} ${mensaje}`;
      }
    }

    super(message);
    this.name = name;
  }
}
