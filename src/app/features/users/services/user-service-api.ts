import { Injectable } from '@angular/core';
import { BaseApi } from '@/shared/services/base.api';

@Injectable({
  providedIn: 'root',
})
export class UserServiceApi extends BaseApi{
  private readonly _url = '/user';

  async banUser(id: number, bannedUntil: Date | null): Promise<void> {
    const payload = { bannedUntil };
    await this.patch(`${this._url}/${id}/ban`, payload);
  }

  async unban(id: number): Promise<void> {
    await this.patch(`${this._url}/${id}/unban`, {});
  }

  async deleteUser(id: number): Promise<void> {
    await this.delete(`${this._url}/${id}`);
  }
}
