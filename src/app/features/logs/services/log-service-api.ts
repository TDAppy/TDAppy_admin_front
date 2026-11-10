import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BaseApi } from '@/shared/services/base.api';
import { LogsResponse } from '@/features/logs/models/log.model';

@Injectable({
  providedIn: 'root',
})
export class LogServiceApi extends BaseApi {
  // environment.apiUrl inclut déjà /admin : ce suffixe correspond à /admin/logs côté API.
  private readonly _url = '/logs';

  async getLogs(lines = 300): Promise<LogsResponse> {
    const params = new HttpParams().set('lines', lines);
    return this.get<LogsResponse>(this._url, params);
  }
}
