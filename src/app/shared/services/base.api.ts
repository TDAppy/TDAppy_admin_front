import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from '@/shared/services/cookie-service';
import { ErrorService } from '@/core/services/error.service';

@Injectable()
export abstract class BaseApi {
  protected http = inject(HttpClient);
  protected readonly BASE_URL = environment.apiUrl;
  private _errorService = inject(ErrorService);
  private readonly _cookieService = inject(CookieService);

  protected getHeaders(): HttpHeaders {
    const token = this._cookieService.get('auth_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });
  }

  protected async get<T>(endpoint: string, params?: HttpParams): Promise<T> {
    try {
      return await firstValueFrom(
        this.http.get<T>(`${this.BASE_URL}${endpoint}`, {
          headers: this.getHeaders(),
          params: params,
        }),
      );
    } catch (error) {
      throw this._handleError(error);
    }
  }

  protected async post<T>(endpoint: string, body: any): Promise<T> {
    try {
      return await firstValueFrom(
        this.http.post<T>(`${this.BASE_URL}${endpoint}`, body, { headers: this.getHeaders() }),
      );
    } catch (error) {
      throw this._handleError(error);
    }
  }

  protected async put<T>(endpoint: string, body: any): Promise<T> {
    try {
      return await firstValueFrom(
        this.http.put<T>(`${this.BASE_URL}${endpoint}`, body, { headers: this.getHeaders() }),
      );
    } catch (error) {
      throw this._handleError(error);
    }
  }

  protected async patch<T>(endpoint: string, body: any): Promise<T> {
    try {
      return await firstValueFrom(
        this.http.patch<T>(`${this.BASE_URL}${endpoint}`, body, { headers: this.getHeaders() }),
      );
    } catch (error) {
      throw this._handleError(error);
    }
  }

  protected async delete<T>(endpoint: string): Promise<T> {
    try {
      return await firstValueFrom(
        this.http.delete<T>(`${this.BASE_URL}${endpoint}`, { headers: this.getHeaders() }),
      );
    } catch (error) {
      throw this._handleError(error);
    }
  }

  private _handleError(error: any): Error {
    if (error instanceof HttpErrorResponse) {
      let err: Error;
      switch (error.status) {
        case 400:
          err = new Error('Données invalides');
          break;
        case 401:
          err = new Error('Non autorisé');
          break;
        case 403:
          err = new Error('Accès interdit');
          break;
        case 404:
          err = new Error('Ressource non trouvée');
          break;
        case 500:
          err = new Error('Erreur serveur');
          break;
        default:
          err = new Error('Erreur réseau');
          break;
      }
      this._errorService.notify(err.message);
      return err;
    }
    const generic = new Error('Erreur inconnue');
    this._errorService.notify(generic.message);
    return generic;
  }
}
