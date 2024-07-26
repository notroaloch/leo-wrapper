import { AxiosResponse } from 'axios';

import LeoAuth from './LeoAuth';
import LeoError from './LeoError';
import MicroLeoAPI from '../api/microleo';
import {
  AuthCredentials,
  AuthToken,
  MicroLeoResponse,
  StudentCareer,
  StudentInfo,
} from '../types';

// Manages the main wrapper logic (methods as API calls)
export default class LeoWrapper {
  private auth?: LeoAuth;

  // Static class instance generator (allows async class constructor)
  static async build(authCredentials: AuthCredentials): Promise<LeoWrapper> {
    const leoWrapper = new LeoWrapper();
    await leoWrapper.init(authCredentials);
    return leoWrapper;
  }
  private async init(authCredentials: AuthCredentials): Promise<LeoWrapper> {
    this.auth = await LeoAuth.build(authCredentials);
    return this;
  }
  private constructor() {}

  private get authToken(): AuthToken | undefined {
    return this.auth?.authToken;
  }

  public async getStudentInfo() {
    try {
      const { data }: AxiosResponse<MicroLeoResponse> = await MicroLeoAPI.get(
        `/sii-alumnos/v1/${this.auth?.authCredentials.userCode}/datos-personales`,
        {
          validateStatus: (status: number) => {
            return status === 200;
          },
        }
      );

      const studentInfo: StudentInfo = data.respuesta;
      return studentInfo;
    } catch (error) {
      throw new LeoError(error);
    }
  }

  public async getStudentCareers() {
    try {
      const { data }: AxiosResponse<MicroLeoResponse> = await MicroLeoAPI.get(
        `/esc-alumnos/v1/${this.auth?.authCredentials.userCode}/planes-estudios`,
        {
          validateStatus: (status: number) => {
            return status === 200;
          },
        }
      );

      const studentCareers: StudentCareer[] = data.respuesta;
      return studentCareers;
    } catch (error) {
      throw new LeoError(error);
    }
  }
}
