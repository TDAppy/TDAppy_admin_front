import { Component } from '@angular/core';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';
import tableColumns from 'public/assets/data/table-columns.json';

@Component({
  selector: 'app-report-user-content',
  imports: [AdminTable],
  templateUrl: './report-user-content.html',
  styleUrl: './report-user-content.css',
})
export class ReportUserContent {
  columns = tableColumns.reportsUsers;
  data = [];
}
