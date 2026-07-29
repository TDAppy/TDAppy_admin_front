import { Component, inject, OnInit, signal } from '@angular/core';
import tableColumns from '../../../../../../public/assets/data/table-columns.json';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';
import tableActions from '../../../../../../public/assets/data/actions-menu.json';
import { PodcastContentServiceApi } from '@/features/content/services/podcast-content-service-api';
import { PodcastCreateModel, PodcastModel } from '@/features/content/models/podcasts.model';
import { AddPodcastModal } from '@/features/content/components/add-podcast-modal/add-podcast-modal';
import { TableColumn } from '@/core/models/table-column.model';
import { UpdatePodcastModal } from '@/features/content/components/update-podcast-modal/update-podcast-modal';
import { ConfirmDeleteModal } from '@/features/users/components/confirm-delete-modal/confirm-delete-modal';

@Component({
  selector: 'app-podcast-content',
  imports: [AdminTable, AddPodcastModal, UpdatePodcastModal, ConfirmDeleteModal],
  templateUrl: './podcast-content.html',
  styleUrl: './podcast-content.css',
})
export class PodcastContent implements OnInit {
  private _podcastApi = inject(PodcastContentServiceApi);

  actions = tableActions.contentPodcasts;
  columns = tableColumns.contentPodcasts as TableColumn[];
  data = signal<PodcastModel[]>([]);
  showAddModal = signal(false);
  showUpdateModal = signal(false);
  showDeleteModal = signal(false);
  selectedPodcast = signal<PodcastModel | null>(null);

  ngOnInit(): void {
    this._podcastApi.getAllPodcasts().then((result) => {
      this.data.set(result);
    });
  }

  async onActionTriggered(event: { key: string; row: PodcastModel }): Promise<void> {
    switch (event.key) {
      case 'edit':
        this.selectedPodcast.set(event.row);
        this.showUpdateModal.set(true);
        break;
      case 'delete':
        this.selectedPodcast.set(event.row);
        this.showDeleteModal.set(true);
        break;
    }
  }

  async onPodcastConfirmed(payload: PodcastCreateModel): Promise<void> {
    const newPodcast = await this._podcastApi.createPodcast(payload);
    this.data.set([newPodcast, ...this.data()]);
    this.showAddModal.set(false);
  }

  async onUpdateConfirmed(payload: PodcastCreateModel): Promise<void> {
    const podcast = this.selectedPodcast();
    if (!podcast) return;
    const updated = await this._podcastApi.updatePodcast(podcast.id, payload);
    this.data.set(this.data().map((p) => (p.id === podcast.id ? updated : p)));
    this.showUpdateModal.set(false);
    this.selectedPodcast.set(null);
  }

  async onDeleteConfirmed(): Promise<void> {
    const podcast = this.selectedPodcast();
    if (!podcast) return;
    await this._podcastApi.deletePodcast(podcast.id);
    this.data.set(this.data().filter((p) => p.id !== podcast.id));
    this.showDeleteModal.set(false);
    this.selectedPodcast.set(null);
  }
}
