import { Component, inject, OnInit, signal } from '@angular/core';
import tableColumns from '../../../../../../public/assets/data/table-columns.json';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';
import tableActions from '../../../../../../public/assets/data/actions-menu.json';
import { TopicServiceApi } from '@/features/forums/services/topic-service-api';
import { TopicDeactivatedModel } from '@/features/forums/models/topic.model';
import { ConfirmDeleteModal } from '@/features/users/components/confirm-delete-modal/confirm-delete-modal';

@Component({
  selector: 'app-forum-deactivated-content',
  imports: [AdminTable, ConfirmDeleteModal],
  templateUrl: './forum-deactivated-content.html',
  styleUrl: './forum-deactivated-content.css',
})
export class ForumDeactivatedContent implements OnInit {
  private readonly _topicListServiceApi = inject(TopicServiceApi);

  actions = tableActions.forumsDeactivated;
  columns = tableColumns.forumsDeactivated;
  data = signal<TopicDeactivatedModel[]>([]);
  showToggleStatusModal = signal(false);
  showDeleteModal = signal(false);
  selectedTopic = signal<TopicDeactivatedModel | null>(null);

  ngOnInit(): void {
    this._topicListServiceApi.getAllTopicsDeactivated().then((result) => {
      this.data.set(result);
    });
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
