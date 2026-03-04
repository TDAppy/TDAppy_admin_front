import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginStore {
  private _isLoading = signal<boolean>(false);
  private _error = signal<string | null>(null);
  private _token = signal<string | null>(null);

  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly isAuthenticated = computed(() => !!this._token);

  setLoading(value: boolean): void {
    this._isLoading.set(value);
  }

  setError(message: string | null): void {
    this._error.set(message);
  }

  setToken(token: string | null): void {
    this._token.set(token);
  }

  getToken(): string | null {
    return this._token();
  }
}
