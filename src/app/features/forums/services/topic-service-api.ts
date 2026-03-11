import { Injectable } from '@angular/core';
import { BaseApi } from '@/shared/services/base.api';
import {
  TopicDeactivatedModel,
  TopicModel,
  TopicUpdateModel,
} from '@/features/forums/models/topic.model';
import { PageResponse } from '@/core/models/pageable.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TopicServiceApi extends BaseApi {
  private readonly _url = '/topic';

  async getAllTopics(page: number = 0): Promise<PageResponse<TopicModel>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', 50);
    const response = await this.get<any>(this._url, params);

    return {
      content: response.content.map((item: any) => ({
        id: item.id,
        topicTitle: item.title,
        authorUsername: item.username,
        createdAt: new Date(item.created_at).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        status: item.isActive ? 'Actif' : 'Désactivé',
        message: item.message,
        categoryName: item.categoryName,
      })),
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      totalItems: response.totalItems,
      size: response.size,
    };
  }

  async getAllTopicsDeactivated(page: number = 0): Promise<PageResponse<TopicDeactivatedModel>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', 50);
    const response = await this.get<any>(`${this._url}/deactivated`, params);

    return {
      content: response.content.map((item: any) => ({
        id: item.id,
        topicTitle: item.title,
        authorUsername: item.username,
      })),
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      totalItems: response.totalItems,
      size: response.size,
    };
  }

  async changeTopicStatus(id: number): Promise<void> {
    await this.patch(`${this._url}/${id}/toggle`, {});
  }

  async updateTopic(id: number, payload: TopicUpdateModel): Promise<void> {
    await this.put(`${this._url}/${id}`, payload);
  }

  async deleteTopic(id: number): Promise<void> {
    await this.delete(`${this._url}/${id}`);
  }
}
