import { Component } from '@angular/core';
import tableColumns from '../../../../../../public/assets/data/table-columns.json';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';

@Component({
  selector: 'app-report-topic-content',
  imports: [AdminTable],
  templateUrl: './report-topic-content.html',
  styleUrl: './report-topic-content.css',
})
export class ReportTopicContent {
  columns = tableColumns.reportsTopics;
  data = [];
}
