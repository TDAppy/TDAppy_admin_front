import { Injectable } from '@angular/core';
import { BaseApi } from '@/shared/services/base.api';
import { ResourceCreateModel, ResourcesModel } from '@/features/content/models/resources.model';

@Injectable({
  providedIn: 'root',
})
export class ResourceContentServiceApi extends BaseApi {
  private readonly _url = '/resources';

  async getAllResourcesForChildren(): Promise<ResourcesModel[]> {
    const response = await this.get<any[]>(this._url + '/children');
    return response.map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      image: item.urlImage,
      type: item.type,
      description: item.description,
      reference: item.reference,
      theme: item.theme,
      publishedAt: new Date(item.createdAt).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    }));
  }

  async getAllResourcesForAdults(): Promise<ResourcesModel[]> {
    const response = await this.get<any[]>(this._url + '/adults');
    return response.map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      image: item.urlImage,
      type: item.type,
      description: item.description,
      reference: item.reference,
      theme: item.theme,
      publishedAt: new Date(item.createdAt).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    }));
  }

  async createResource(payload: ResourceCreateModel): Promise<ResourcesModel> {
    const formData = new FormData();

    const data = {
      title: payload.title,
      content: payload.content,
      type: payload.type,
      description: payload.description,
      reference: payload.reference,
      theme: payload.theme,
    };

    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    if (payload.file) {
      formData.append('image', payload.file);
    }

    const response = await this.postFormData<any>(this._url, formData);
    return {
      id: response.id,
      title: response.title,
      content: response.content,
      image: response.urlImage,
      type: response.type,
      description: response.description,
      reference: response.reference,
      theme: response.theme,
      publishedAt: new Date(response.createdAt).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    };
  }

  async updateResource(id: number, payload: ResourceCreateModel): Promise<ResourcesModel> {
    const formData = new FormData();
    const data = {
      title: payload.title,
      content: payload.content,
      type: payload.type,
      description: payload.description,
      reference: payload.reference,
      theme: payload.theme,
    };
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    if (payload.file) {
      formData.append('image', payload.file);
    }
    const response = await this.putFormData<any>(`${this._url}/${id}`, formData);
    return {
      id: response.id,
      title: response.title,
      content: response.content,
      image: response.urlImage,
      type: response.type,
      description: response.description,
      reference: response.reference,
      theme: response.theme,
      publishedAt: new Date(response.createdAt).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    };
  }

  async deleteResource(id: number): Promise<void> {
    await this.delete(`${this._url}/${id}`);
  }
}
