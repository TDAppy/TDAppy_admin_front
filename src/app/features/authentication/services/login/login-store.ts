import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginStore {
  private _isLoading = signal<boolean>(false);
  private _error = signal<string | null>(null);
  private _token = signal<string | null>(localStorage.getItem('auth_token'));

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
    return this._token() ?? localStorage.getItem('auth_token');
  }

  /**
   * Décode le claim "role" du JWT courant, sans vérification de signature côté client.
   * Ce n'est PAS une frontière de sécurité (le backend revérifie déjà le rôle sur chaque
   * route /admin/**) : ça sert uniquement à éviter d'afficher l'UI admin à un token valide
   * mais non-admin (ex. un token de l'app publique collé manuellement dans le localStorage).
   */
  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + c
            .charCodeAt(0)
            .toString(16)
            .padStart(2, '0'))
          .join(''),
      );
      return JSON.parse(json)?.role ?? null;
    } catch {
      return null;
    }
  }

  clearToken(): void {
    this._token.set(null);
    localStorage.removeItem('auth_token');
  }
}
