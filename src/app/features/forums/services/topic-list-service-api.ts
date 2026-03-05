import { Injectable } from '@angular/core';
import { BaseApi } from '@/shared/services/base.api';
import { TopicModel } from '@/features/forums/models/topic.model';

@Injectable({
  providedIn: 'root',
})
export class TopicListServiceApi extends BaseApi{
  private readonly _url = '/topic';

  async getAllTopics():Promise<TopicModel[]> {
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
    }));
  }
}
