import { Injectable } from '@angular/core';
import { BaseApi } from '@/shared/services/base.api';
import { LoginRequest, LoginResponse } from '@/features/authentication/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginApi extends BaseApi {
  private readonly _url = '/auth/login';

  async login(payload: LoginRequest): Promise<LoginResponse>{
    return this.post<LoginResponse>(this._url, payload);
  }
}
