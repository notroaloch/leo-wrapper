export type AuthCredentials = {
  userCode: number;
  userPassword: string;
};

export type AuthToken = {
  id: string;
  expires: string | null;
};

export type MicroLeoResponse = {
  codigo: number;
  mensaje: string;
  respuesta: any;
};

export type AuthTokenResponse = {
  id_token: string;
  vigencia: string;
  usua_id: string;
  usuario_mov: string;
  fecha_mov: string;
  ip_mov: string;
  vigencia_extra: string;
};

export type StudentScheduleArgs = {
  careerProgramID: string;
  academicTerm: string;
};
