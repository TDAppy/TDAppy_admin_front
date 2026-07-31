import { Injectable } from '@angular/core';
import { BaseApi } from '@/shared/services/base.api';
import { PodcastCreateModel, PodcastModel } from '@/features/content/models/podcasts.model';

@Injectable({
  providedIn: 'root',
})
export class PodcastContentServiceApi extends BaseApi {
  // environment.apiUrl (BaseApi.BASE_URL) inclut déjà le préfixe /admin pour cette application,
  // donc ce suffixe ne doit PAS le répéter : /podcasts ici correspond bien à /admin/podcasts
  // côté API (AdminPodcastController).
  private readonly _url = '/podcasts';

  async getAllPodcasts(): Promise<PodcastModel[]> {
    const response = await this.get<any[]>(this._url);
    return response.map((item) => this._map(item));
  }

  async createPodcast(payload: PodcastCreateModel): Promise<PodcastModel> {
    const formData = this._buildFormData(payload);
    const response = await this.postFormData<any>(this._url, formData);
    return this._map(response);
  }

  async updatePodcast(id: number, payload: PodcastCreateModel): Promise<PodcastModel> {
    const formData = this._buildFormData(payload);
    const response = await this.putFormData<any>(`${this._url}/${id}`, formData);
    return this._map(response);
  }

  async deletePodcast(id: number): Promise<void> {
    await this.delete(`${this._url}/${id}`);
  }

  private _buildFormData(payload: PodcastCreateModel): FormData {
    const formData = new FormData();
    const data = {
      title: payload.title,
      description: payload.description,
      durationSeconds: payload.durationSeconds,
    };

    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    if (payload.audioFile) {
      formData.append('audio', payload.audioFile);
    }
    if (payload.coverFile) {
      formData.append('cover', payload.coverFile);
    }
    return formData;
  }

  private _map(item: any): PodcastModel {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      audio: item.audioUrl,
      image: item.coverImageUrl,
      durationSeconds: item.durationSeconds,
      duration: item.durationSeconds ? `${Math.round(item.durationSeconds / 60)} min` : '—',
      publishedAt: new Date(item.publishedAt).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    };
  }
}
