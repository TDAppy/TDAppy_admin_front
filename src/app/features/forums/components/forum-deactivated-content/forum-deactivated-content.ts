import { Component, inject, OnInit, signal } from '@angular/core';
import tableColumns from '../../../../../../public/assets/data/table-columns.json';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';
import tableActions from '../../../../../../public/assets/data/actions-menu.json';
import { TopicServiceApi } from '@/features/forums/services/topic-service-api';
import { TopicDeactivatedModel } from '@/features/forums/models/topic.model';
import { ConfirmDeleteModal } from '@/features/users/components/confirm-delete-modal/confirm-delete-modal';
import { Pagination } from '@/core/components/pagination/pagination';

@Component({
  selector: 'app-forum-deactivated-content',
  imports: [AdminTable, ConfirmDeleteModal, Pagination],
  templateUrl: './forum-deactivated-content.html',
  styleUrl: './forum-deactivated-content.css',
})
export class ForumDeactivatedContent implements OnInit {
  private readonly _topicListServiceApi = inject(TopicServiceApi);

  actions = tableActions.forumsDeactivated;
  columns = tableColumns.forumsDeactivated;
  data = signal<TopicDeactivatedModel[]>([]);
  currentPage = signal(0);
  totalPages = signal(0);
  totalItems = signal(0);
  showToggleStatusModal = signal(false);
  showDeleteModal = signal(false);
  selectedTopic = signal<TopicDeactivatedModel | null>(null);

  ngOnInit(): void {
    this.loadDeactivatedTopics();
  }

  loadDeactivatedTopics(): void {
    this._topicListServiceApi.getAllTopicsDeactivated(this.currentPage()).then((result) => {
      this.data.set(result.content);
      this.totalPages.set(result.totalPages);
      this.totalItems.set(result.totalItems);
    });
  }

  goToPage(page: number): void {
    this.currentPage.set(page);
    this.loadDeactivatedTopics();
  }

  async onActionTriggered(event: { key: string; row: TopicDeactivatedModel }): Promise<void> {
    switch (event.key) {
      case 'activate':
        this.selectedTopic.set(event.row);
        this.showToggleStatusModal.set(true);
        break;
      case 'delete':
        this.selectedTopic.set(event.row);
        this.showDeleteModal.set(true);
        break;
    }
  }

  async onToggleStatusConfirmed(): Promise<void> {
    const topic = this.selectedTopic();
    if (!topic) return;
    await this._topicListServiceApi.changeTopicStatus(topic.id);
    this.data.set(this.data().filter((t) => t.id !== topic.id));
    this.showToggleStatusModal.set(false);
    this.selectedTopic.set(null);
  }

  async onDeleteConfirmed(): Promise<void> {
    const topic = this.selectedTopic();
    if (!topic) return;
    await this._topicListServiceApi.deleteTopic(topic.id);
    this.data.set(this.data().filter((t) => t.id !== topic.id));
    this.showDeleteModal.set(false);
    this.selectedTopic.set(null);
  }
}
