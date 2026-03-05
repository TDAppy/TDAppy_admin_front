import { Component } from '@angular/core';
import tableColumns from '../../../../../../public/assets/data/table-columns.json';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';

@Component({
  selector: 'app-user-list-content',
  imports: [AdminTable],
  templateUrl: './user-list-content.html',
  styleUrl: './user-list-content.css',
})
export class UserListContent {
  columns = tableColumns.usersList;
  data = [];
}
