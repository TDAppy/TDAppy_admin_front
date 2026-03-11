import { Component, inject, OnInit, signal } from '@angular/core';
import tableColumns from '../../../../../../public/assets/data/table-columns.json';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';
import { TopicServiceApi } from '@/features/forums/services/topic-service-api';
import { TopicModel, TopicUpdateModel } from '@/features/forums/models/topic.model';
import tableActions from '../../../../../../public/assets/data/actions-menu.json';
import { ConfirmDeleteModal } from '@/features/users/components/confirm-delete-modal/confirm-delete-modal';
import { environment } from '@/../environments/environment';
import { UpdateTopicModal } from '@/features/forums/components/update-topic-modal/update-topic-modal';
import { Pagination } from '@/core/components/pagination/pagination';

@Component({
  selector: 'app-forum-list-content',
  imports: [AdminTable, ConfirmDeleteModal, UpdateTopicModal, Pagination],
  templateUrl: './forum-list-content.html',
  styleUrl: './forum-list-content.css',
})
export class ForumListContent implements OnInit {
  private readonly _topicListServiceApi = inject(TopicServiceApi);

  actions = tableActions.forumsList;
  columns = tableColumns.forumsList;
  data = signal<TopicModel[]>([]);
  currentPage = signal(0);
  totalPages = signal(0);
  totalItems = signal(0);
  showToggleStatusModal = signal(false);
  showUpdateTopicModal = signal(false);
  selectedTopic = signal<TopicModel | null>(null);

  ngOnInit(): void {
    this.loadTopics();
  }

  loadTopics(): void {
    this._topicListServiceApi.getAllTopics(this.currentPage()).then((result) => {
      this.data.set(result.content);
      this.totalPages.set(result.totalPages);
      this.totalItems.set(result.totalItems);
    });
  }

  goToPage(page: number): void {
    this.currentPage.set(page);
    this.loadTopics();
  }

  async onActionTriggered(event: { key: string; row: TopicModel }): Promise<void> {
    switch (event.key) {
      case 'see':
        window.open(`${environment.frontendUrl}/forum/${event.row.id}`, '_blank');
        break;
      case 'edit':
        this.selectedTopic.set(event.row);
        this.showUpdateTopicModal.set(true);
        break;
      case 'toggleActive':
        this.selectedTopic.set(event.row);
        this.showToggleStatusModal.set(true);
        break;
    }
  }

  async onToggleStatusConfirmed(): Promise<void> {
    const topic = this.selectedTopic();
    if (!topic) return;
    await this._topicListServiceApi.changeTopicStatus(topic.id);
    this.data.set(
      this.data().map((t) =>
        t.id === topic.id ? { ...t, status: t.status === 'Actif' ? 'Désactivé' : 'Actif' } : t,
      ),
    );
    this.showToggleStatusModal.set(false);
    this.selectedTopic.set(null);
  }

  async onUpdateTopicConfirm(payload: TopicUpdateModel): Promise<void> {
    const topic = this.selectedTopic();
    if (!topic) return;
    await this._topicListServiceApi.updateTopic(topic.id, payload);
    this.data.set(
      this.data().map((t) =>
        t.id === topic.id
          ? { ...t, topicTitle: payload.title, categoryName: payload.categoryName }
          : t,
      ),
    );
    this.showUpdateTopicModal.set(false);
    this.selectedTopic.set(null);
  }
}
