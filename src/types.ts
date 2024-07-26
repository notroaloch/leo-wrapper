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

export type StudentInfo = {
  alumcodigo: string;
  curp: string;
  desctiposangr: string;
  domicilio: string;
  email: string;
  fechnacimient: string;
  firma: string;
  foto: string;
  genero: string;
  imss: string;
  lugadomicilio: {
    cp: string;
    estado: string;
    municipio: string;
    pais: string;
  };
  lugadomicilioDB: string;
  nombre: string;
  rfc: string;
  teleemergenci: string;
  tiposangre: string;
};
