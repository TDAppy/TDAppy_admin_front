import { Component } from '@angular/core';
import tableColumns from '../../../../../../public/assets/data/table-columns.json';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';

@Component({
  selector: 'app-forum-deactivated-content',
  imports: [AdminTable],
  templateUrl: './forum-deactivated-content.html',
  styleUrl: './forum-deactivated-content.css',
})
export class ForumDeactivatedContent {
  columns = tableColumns.forumsDeactivated;
  data = [];
}
