import { Component, inject, OnInit, signal } from '@angular/core';
import tableColumns from '../../../../../../public/assets/data/table-columns.json';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';
import tableActions from '../../../../../../public/assets/data/actions-menu.json';
import { ResourceContentServiceApi } from '@/features/content/services/resource-content-service-api';
import { ResourceCreateModel, ResourcesModel } from '@/features/content/models/resources.model';
import { AddResourceModal } from '@/features/content/components/add-resource-modal/add-resource-modal';
import { TableColumn } from '@/core/models/table-column.model';
import { UpdateResourceModal } from '@/features/content/components/update-resource-modal/update-resource-modal';
import { ConfirmDeleteModal } from '@/features/users/components/confirm-delete-modal/confirm-delete-modal';

@Component({
  selector: 'app-resource-content',
  imports: [AdminTable, AddResourceModal, UpdateResourceModal, ConfirmDeleteModal],
  templateUrl: './resource-content.html',
  styleUrl: './resource-content.css',
})
export class ResourceContent implements OnInit {
  private _resourceApi = inject(ResourceContentServiceApi);

  actions = tableActions.contentResources;
  columns = tableColumns.contentResources as TableColumn[];
  childrenData = signal<ResourcesModel[]>([]);
  adultsData = signal<ResourcesModel[]>([]);
  showAddModal = signal(false);
  showUpdateModal = signal(false);
  showDeleteModal = signal(false);
  selectedResource = signal<ResourcesModel | null>(null);

  ngOnInit(): void {
    this._resourceApi.getAllResourcesForChildren().then((result) => {
      this.childrenData.set(result);
    });
    this._resourceApi.getAllResourcesForAdults().then((result) => {
      this.adultsData.set(result);
    });
  }

  async onActionTriggered(event: { key: string; row: ResourcesModel }): Promise<void> {
    switch (event.key) {
      case 'edit':
        this.selectedResource.set(event.row);
        this.showUpdateModal.set(true);
        break;
      case 'delete':
        this.selectedResource.set(event.row);
        this.showDeleteModal.set(true);
        break;
    }
  }

  async onResourceConfirmed(payload: ResourceCreateModel): Promise<void> {
    const newResource = await this._resourceApi.createResource(payload);
    if (payload.theme === 'CHILDREN') {
      this.childrenData.set([...this.childrenData(), newResource]);
    } else {
      this.adultsData.set([...this.adultsData(), newResource]);
    }
    this.showAddModal.set(false);
  }

  async onUpdateConfirmed(payload: ResourceCreateModel): Promise<void> {
    const resource = this.selectedResource();
    if (!resource) return;
    const updated = await this._resourceApi.updateResource(resource.id, payload);
    const updateList = (list: ResourcesModel[]):ResourcesModel[] =>
      list.map((r) => (r.id === resource.id ? updated : r));
    this.childrenData.set(updateList(this.childrenData()));
    this.adultsData.set(updateList(this.adultsData()));
    this.showUpdateModal.set(false);
    this.selectedResource.set(null);
  }

  async onDeleteConfirmed(): Promise<void> {
    const resource = this.selectedResource();
    if (!resource) return;
    await this._resourceApi.deleteResource(resource.id);
    this.childrenData.set(this.childrenData().filter((r) => r.id !== resource.id));
    this.adultsData.set(this.adultsData().filter((r) => r.id !== resource.id));
    this.showDeleteModal.set(false);
    this.selectedResource.set(null);
  }
}
