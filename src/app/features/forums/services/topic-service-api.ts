import { Injectable } from '@angular/core';
import { BaseApi } from '@/shared/services/base.api';
import {
  TopicDeactivatedModel,
  TopicModel,
  TopicUpdateModel,
} from '@/features/forums/models/topic.model';

@Injectable({
  providedIn: 'root',
})
export class TopicServiceApi extends BaseApi {
  private readonly _url = '/topic';

  async getAllTopics(): Promise<TopicModel[]> {
    const response = await this.get<any[]>(this._url);

    return response.map((item) => ({
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
    }));
  }

  async changeTopicStatus(id: number): Promise<void> {
    await this.patch(`${this._url}/${id}/toggle`, {});
  }

  async getAllTopicsDeactivated(): Promise<TopicDeactivatedModel[]> {
    const response = await this.get<any[]>(`${this._url}/deactivated`);
    return response.map((item) => ({
      id: item.id,
      topicTitle: item.title,
      authorUsername: item.username
    }));
  }

  async updateTopic(id: number, payload: TopicUpdateModel): Promise<void> {
    await this.put(`${this._url}/${id}`, payload);
  }

  async deleteTopic(id: number): Promise<void> {
    await this.delete(`${this._url}/${id}`);
  }
}
