import { inject, Injectable } from '@angular/core';
import { LoginStore } from '@/features/authentication/services/login/login-store';
import { LoginApi } from '@/features/authentication/services/login/login-api';
import { LoginRequest } from '@/features/authentication/models/login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginFacade {
  private readonly _store = inject(LoginStore);
  private readonly _api = inject(LoginApi);
  private readonly _router = inject(Router);

  readonly isLoading = this._store.isLoading;
  readonly error = this._store.error;

  async login(credentials: LoginRequest): Promise<boolean> {
    this._store.setLoading(true);
    this._store.setError(null);

    try {
      const response = await this._api.login(credentials);
      this._store.setToken(response.token);
      localStorage.setItem('auth_token', response.token);
      return true;
    } catch {
      this._store.setError('Identifiant ou mot de passe incorrect');
      return false;
    } finally {
      this._store.setLoading(false);
    }
  }

  logout(): void {
    this._store.clearToken();
    this._router.navigate(['/']);
  }
}
