import { Injectable } from '@angular/core';
import { BaseApi } from '@/shared/services/base.api';
import { UserModel } from '@/features/users/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserListServiceApi extends BaseApi {
  private readonly _url = '/user';

  async getAllUsers(): Promise<UserModel[]> {
    const response = await this.get<any[]>(this._url);

    return response.map((item) => ({
      id: item.id,
      username: item.username,
      status: item.isDeleted ? 'Supprimé' : item.isBanned ? 'Banni' : 'Actif',
    }));
  }
}
