import { Injectable } from '@angular/core';
import { BaseApi } from '@/shared/services/base.api';
import { UserBannedModel } from '@/features/users/models/user.model';
import { formatDuration } from '@/shared/utils/format-duration';
import { HttpParams } from '@angular/common/http';
import { PageResponse } from '@/core/models/pageable.model';

@Injectable({
  providedIn: 'root',
})
export class UserBannedServiceApi extends BaseApi {
  private readonly _url = '/user/banned';

  async getAllBannedUsers(page: number = 0): Promise<PageResponse<UserBannedModel>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', 50);
    const response = await this.get<any>(this._url, params);

    return {
      content: response.content.map((item: any) => ({
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
      })),
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      totalItems: response.totalItems,
      size: response.size,
    };
  }
}
