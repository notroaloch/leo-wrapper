import LeoAuth from './LeoAuth';
import { fetchMicroLeo } from '../api/microleo';
import { fetchSoyUDG } from '../api/soyudg';
import { AuthCredentials } from '../types';
import {
  validateAcademicTerm,
  validateCampusID,
  validateCampusSEMSID,
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

  public async getCampuses<T>(): Promise<T> {
    const campuses = await fetchMicroLeo<T>({
      method: 'GET',
      url: '/esc-programas/v1/centros',
      validateStatus(status: number) {
        return status === 200;
      },
    });

    return campuses;
  }

  public async getCampusesSEMS<T>(): Promise<T> {
    const campusesSEMS = await fetchMicroLeo<T>({
      method: 'GET',
      url: '/esc-programas/v1/sedes',
      validateStatus(status: number) {
        return status === 200;
      },
    });

    return campusesSEMS;
  }

  public async getCampusCareers<T>({
    campusID,
  }: {
    campusID: string;
  }): Promise<T> {
    validateCampusID(campusID);

    const campusCareers = await fetchMicroLeo<T>({
      method: 'GET',
      url: `/esc-programas/v1/${campusID}/programas-centros`,
      validateStatus(status: number) {
        return status === 200;
      },
    });

    return campusCareers;
  }

  public async getCampusSEMSCareers<T>({
    campusID,
  }: {
    campusID: string;
  }): Promise<T> {
    validateCampusSEMSID(campusID);

    const campusCareers = await fetchMicroLeo<T>({
      method: 'GET',
      url: `/esc-programas/v1/${campusID}/programas-sedes`,
      validateStatus(status: number) {
        return status === 200;
      },
    });

    return campusCareers;
  }

  public async getCareerAcademicTerms<T>({
    careerID,
  }: {
    careerID: string;
  }): Promise<T> {
    const careerAcademicTerms = await fetchMicroLeo<T>({
      method: 'GET',
      url: `/esc-programas/v1/${careerID}/ciclos`,
      validateStatus(status: number) {
        return status === 200;
      },
    });

    return careerAcademicTerms;
  }

  public async getAcademicOffer<T>({
    campusID,
    academicTerm,
    careerID,
    campusSEMSID,
  }: {
    campusID: string;
    academicTerm: string;
    careerID: string;
    campusSEMSID?: string;
  }): Promise<T> {
    campusSEMSID && validateCampusSEMSID(campusSEMSID);
    validateCampusID(campusID) && validateAcademicTerm(academicTerm);

    const academicOffer = await fetchMicroLeo<T>({
      method: 'POST',
      url: '/esc-ofertas/v1/horas-nrc',
      data: {
        idcentro: campusID,
        idciclo: academicTerm,
        idprograma: careerID,
        idsede: campusSEMSID,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      validateStatus(status: number) {
        return status === 200;
      },
    });

    return academicOffer;
  }

  public async getStudentInfo<T>(): Promise<T> {
    const studentInfo = await fetchMicroLeo<T>({
      method: 'GET',
      url: `/sii-alumnos/v1/${this.userCode}/datos-personales`,
      validateStatus(status: number) {
        return status === 200;
      },
    });

    return studentInfo;
  }

  public async getStudentCard<T>({
    userCode,
  }: {
    userCode: number;
  }): Promise<T> {
    const studentCard = await fetchSoyUDG<T>({
      method: 'GET',
      url: '/alumnos/show',
      params: {
        encryptedId: LeoAuth.encryptUserCode(userCode),
      },
      validateStatus(status: number) {
        return status === 200;
      },
    });

    return studentCard;
  }

  public async getStudentCareers<T>(): Promise<T> {
    const studentCareers = await fetchMicroLeo<T>({
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
  }: {
    academicTerm: string;
    careerProgramID: string;
  }): Promise<T> {
    validateAcademicTerm(academicTerm);

    const studentSchedule = await fetchMicroLeo<T>({
      method: 'GET',
      url: `/esc-alumnos/v1/${this.userCode}/${careerProgramID}/${academicTerm}/horarios`,
      validateStatus(status: number) {
        return status === 200;
      },
    });

    return studentSchedule;
  }
}
