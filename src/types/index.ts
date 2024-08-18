export type AuthCredentials = {
  userCode: number;
  userPassword: string;
};

export type AuthToken = {
  id: string;
  expires: string | null;
};

export type MicroLeoResponse<T> = {
  codigo: number;
  mensaje: string;
  respuesta: T;
};

export type SoyUdgResponse<T> = {
  code: number;
  data: T;
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
