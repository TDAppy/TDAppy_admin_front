import { Injectable } from '@angular/core';
import { BaseApi } from '@/shared/services/base.api';

@Injectable({
  providedIn: 'root',
})
export class CategoryServiceApi extends BaseApi {
  private readonly _url = '/categories';

  async getAllCategories(): Promise<string[]> {
    const response = await this.get<{ name: string }[]>(this._url);
    return response.map((item) => item.name);
  }
}
