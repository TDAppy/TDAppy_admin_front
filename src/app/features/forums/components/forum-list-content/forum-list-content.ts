import { Component } from '@angular/core';
import tableColumns from '../../../../../../public/assets/data/table-columns.json';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';

@Component({
  selector: 'app-forum-list-content',
  imports: [AdminTable],
  templateUrl: './forum-list-content.html',
  styleUrl: './forum-list-content.css',
})
export class ForumListContent {
  columns = tableColumns.forumsList;
  data = [];
}
