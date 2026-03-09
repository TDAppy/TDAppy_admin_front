import { Component } from '@angular/core';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';
import tableColumns from 'public/assets/data/table-columns.json';
import tableActions from '../../../../../../public/assets/data/actions-menu.json';

@Component({
  selector: 'app-report-user-content',
  imports: [AdminTable],
  templateUrl: './report-user-content.html',
  styleUrl: './report-user-content.css',
})
export class ReportUserContent {
  actions = tableActions.reportsUsers;
  columns = tableColumns.reportsUsers;
  data = [];
}
