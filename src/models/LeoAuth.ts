import { AxiosResponse } from 'axios';
import MicroLeoAPI from '../api/microleo';

import {
  AuthCredentials,
  AuthToken,
  AuthTokenResponse,
  MicroLeoResponse,
} from '../types';

import {
  AUTH_CUSTOM_TOKEN_BASE_PHRASE,
  AUTH_CUSTOM_TOKEN_CYPHER_KEY,
  encryptPhrase,
  getFormattedTimestamp,
  hashPassword,
} from '../utils/auth/index';
import LeoError from './LeoError';

// Manages the auth logic (token generation and API instance auth headers configuration)
export default class LeoAuth {
  private _authToken?: AuthToken;
  private _customToken?: AuthToken;
  private _authCredentials: AuthCredentials;

  // Static class instance generator (allows async class constructor)
  static async build(authCredentials: AuthCredentials): Promise<LeoAuth> {
    const auth = new LeoAuth(authCredentials);
    await auth.init();
    return auth;
  }
  private constructor(authCredentials: AuthCredentials) {
    this._authCredentials = authCredentials;
  }

  private async init(): Promise<LeoAuth> {
    this._customToken = LeoAuth.generateCustomToken();
    this._authToken = await this.generateAuthToken();

    // Sets the authorization headers needed for all subsequent request using axios interceptors
    MicroLeoAPI.interceptors.request.use(
      (config) => {
        config.headers['Authorization'] = LeoAuth.generateCustomToken().id;
        config.headers['Authorization-Key'] = this._authToken?.id;
        return config;
      },
      (error) => {
        // TODO: Implement Error
      }
    );

    return this;
  }

  public get authToken(): AuthToken | undefined {
    return this._authToken;
  }

  public get authCredentials(): AuthCredentials {
    return this._authCredentials;
  }

  // Generates a custom token needed for the Authorization header
  // The output token is based on two cypher keys and the current timestamp
  // The encryption is based on a custom algorithm (reverse engineered from Leo SourceCode)
  // No user credentials are needed for the token generation

  public static generateCustomToken(): AuthToken {
    const cypherKey = AUTH_CUSTOM_TOKEN_CYPHER_KEY;
    const basePhrase = AUTH_CUSTOM_TOKEN_BASE_PHRASE;

    const formattedTimestamp = getFormattedTimestamp();
    const phrase = basePhrase.replace(':key:', formattedTimestamp);
    const token = encryptPhrase(phrase, cypherKey);

    const customToken: AuthToken = {
      id: token,
      expires: null,
    };

    return customToken;
  }

  // Generates an authorization token needed for the Authorization-Key header
  // The output token is obtained from MicroLeo server with an expiration date
  // User credentials (code & password) are needed for the token request

  private async generateAuthToken(): Promise<AuthToken> {
    try {
      //  Bcrypt hashing 10 rounds
      const hashedPassword = await hashPassword(
        this._authCredentials.userPassword
      );

      const { data }: AxiosResponse<MicroLeoResponse> = await MicroLeoAPI.post(
        '/login/v1/validar',
        null,
        {
          headers: {
            Authorization: this._customToken?.id,
          },
          params: {
            usr: this._authCredentials.userCode,
            pwd: hashedPassword,
          },
          validateStatus: (status: number) => {
            return status === 201;
          },
        }
      );

      const { id_token, vigencia }: AuthTokenResponse = data.respuesta;

      const authToken: AuthToken = {
        id: `Bearer ${id_token}`,
        expires: vigencia,
      };

      return authToken;
    } catch (error) {
      throw new LeoError(error);
    }
  }
}
