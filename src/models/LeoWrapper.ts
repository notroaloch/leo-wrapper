import LeoAuth from './LeoAuth';
import { AuthCredentials, AuthToken } from '../types';

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

  public get authToken(): AuthToken | undefined {
    return this.auth?.authToken;
  }
}
