import { Component } from '@angular/core';
import tableColumns from '../../../../../../public/assets/data/table-columns.json';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';

@Component({
  selector: 'app-user-banned-content',
  imports: [AdminTable],
  templateUrl: './user-banned-content.html',
  styleUrl: './user-banned-content.css',
})
export class UserBannedContent {
  columns = tableColumns.usersBanned;
  data = [];
}
