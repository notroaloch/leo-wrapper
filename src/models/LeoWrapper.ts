import LeoAuth from './LeoAuth';
import { fetch } from '../api/microleo';
import { AuthCredentials, StudentScheduleArgs } from '../types';
import {
  validateAcademicTerm,
  validateCareerProgramID,
} from '../utils/validate/regexp';

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

  private get userCode(): number {
    return this.auth!.authCredentials.userCode;
  }

  public async getStudentInfo<T>(): Promise<T> {
    const studentInfo = await fetch<T>({
      method: 'GET',
      url: `/sii-alumnos/v1/${this.userCode}/datos-personales`,
      validateStatus(status: number) {
        return status === 200;
      },
    });

    return studentInfo;
  }

  public async getStudentCareers<T>(): Promise<T> {
    const studentCareers = await fetch<T>({
      method: 'GET',
      url: `/esc-alumnos/v1/${this.userCode}/planes-estudios`,
      validateStatus(status: number) {
        return status === 200;
      },
    });

    return studentCareers;
  }

  public async getStudentSchedule<T>({
    academicTerm,
    careerProgramID,
  }: StudentScheduleArgs): Promise<T> {
    validateAcademicTerm(academicTerm) &&
      validateCareerProgramID(careerProgramID);

    const studentSchedule = await fetch<T>({
      method: 'GET',
      url: `/esc-alumnos/v1/${this.userCode}/${careerProgramID}/${academicTerm}/horarios`,
      validateStatus(status: number) {
        return status === 200;
      },
    });

    return studentSchedule;
  }
}
