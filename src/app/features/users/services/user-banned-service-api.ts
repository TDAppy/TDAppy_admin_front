import { Injectable } from '@angular/core';
import { BaseApi } from '@/shared/services/base.api';
import { UserBannedModel } from '@/features/users/models/user.model';
import { formatDuration } from '@/shared/utils/format-duration';

@Injectable({
  providedIn: 'root',
})
export class UserBannedServiceApi extends BaseApi {
  private readonly _url = '/user/banned';

  async getAllBannedUsers(): Promise<UserBannedModel[]> {
    const response = await this.get<any[]>(this._url);

    return response.map((item) => ({
      id: item.id,
      username: item.username,
      bannedAt: new Date(item.bannedAt).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      bannedUntil: item.bannedUntil
        ? new Date(item.bannedUntil).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : null,
      duration: formatDuration(item.duration),
    }));
  }
}
