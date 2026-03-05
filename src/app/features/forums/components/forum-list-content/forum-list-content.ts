import { Component, inject, OnInit, signal } from '@angular/core';
import tableColumns from '../../../../../../public/assets/data/table-columns.json';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';
import { TopicListServiceApi } from '@/features/forums/services/topic-list-service-api';
import { TopicModel } from '@/features/forums/models/topic.model';

@Component({
  selector: 'app-forum-list-content',
  imports: [AdminTable],
  templateUrl: './forum-list-content.html',
  styleUrl: './forum-list-content.css',
})
export class ForumListContent implements OnInit {
  private readonly _topicListServiceApi = inject(TopicListServiceApi);

  columns = tableColumns.forumsList;
  data = signal<TopicModel[]>([]);

  ngOnInit(): void {
    this._topicListServiceApi.getAllTopics().then((result) => {
      this.data.set(result);
    });
  }
}
