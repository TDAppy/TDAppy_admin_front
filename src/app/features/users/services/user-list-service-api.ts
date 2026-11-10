import { Injectable } from '@angular/core';
import { BaseApi } from '@/shared/services/base.api';
import { UserModel } from '@/features/users/models/user.model';
import { HttpParams } from '@angular/common/http';
import { PageResponse } from '@/core/models/pageable.model';

@Injectable({
  providedIn: 'root',
})
export class UserListServiceApi extends BaseApi {
  private readonly _url = '/user';

  async getAllUsers(page: number = 0): Promise<PageResponse<UserModel>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', 50);
    const response = await this.get<any>(this._url, params);

    return {
      content: response.content.map((item: any) => ({
        id: item.id,
        username: item.username,
        status: item.isDeleted ? 'Supprimé' : item.isBanned ? 'Banni' : 'Actif',
        isBanned: item.isBanned,
      })),
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      totalItems: response.totalItems,
      size: response.size,
    };
  }
}
