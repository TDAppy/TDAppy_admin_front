import { Component, HostListener, input, output, signal } from '@angular/core';
import { TableAction, TableColumn } from '@/core/models/table-column.model';
import { ActionsMenu } from '@/core/components/actions-menu/actions-menu';

@Component({
  selector: 'app-admin-table',
  imports: [ActionsMenu],
  templateUrl: './admin-table.html',
  styleUrl: './admin-table.css',
})
export class AdminTable {
  columns = input.required<TableColumn[]>();
  data = input.required<any[]>();
  actions = input.required<TableAction[]>();
  actionTrigerred = output<{ key: string; row: any }>();

  openMenuIndex = signal<number | null>(null);

  onActionTrigerred(event: { key: string; row: any }): void {
    this.actionTrigerred.emit(event);
  }

  toggleMenu(index: number): void {
    this.openMenuIndex.set(this.openMenuIndex() === index ? null : index);
  }

  @HostListener('document:click')
  closeMenu(): void {
    this.openMenuIndex.set(null);
  }
}
