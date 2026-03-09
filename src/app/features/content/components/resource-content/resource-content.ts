import { Component } from '@angular/core';
import tableColumns from '../../../../../../public/assets/data/table-columns.json';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';
import tableActions from '../../../../../../public/assets/data/actions-menu.json';


@Component({
  selector: 'app-resource-content',
  imports: [AdminTable],
  templateUrl: './resource-content.html',
  styleUrl: './resource-content.css',
})
export class ResourceContent {

  actions = tableActions.contentResources;
  columns = tableColumns.contentResources;
  data = [];
}
