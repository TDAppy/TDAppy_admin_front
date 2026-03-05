import { Component, input } from '@angular/core';
import { TableColumn } from '@/core/models/table-column.model';

@Component({
  selector: 'app-admin-table',
  imports: [],
  templateUrl: './admin-table.html',
  styleUrl: './admin-table.css',
})
export class AdminTable {
  columns = input.required<TableColumn[]>();
  data = input.required<any[]>();
}
