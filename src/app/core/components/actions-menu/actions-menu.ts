import { Component, input, output, signal } from '@angular/core';
import { TableAction } from '@/core/models/table-column.model';

@Component({
  selector: 'app-actions-menu',
  imports: [],
  templateUrl: './actions-menu.html',
  styleUrl: './actions-menu.css',
})
export class ActionsMenu {
  actions = input.required<TableAction[]>();
  row = input.required<any>();
  isOpen = input.required<boolean>();
  disabledKeys = input<Record<string, string>>({});
  toggleMenu = output<void>();
  actionTrigerred = output<{ key: string; row: any }>();

  menuX = signal(0);
  menuY = signal(0);

  isDisabled(key: string): boolean {
    return key in this.disabledKeys();
  }

  getTooltip(key: string): string {
    return this.disabledKeys()[key] ?? '';
  }

  openMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuX.set(event.clientX - 170);
    this.menuY.set(event.clientY);
    this.toggleMenu.emit();
  }

  handleAction(key: string): void {
    if(this.isDisabled(key)) return;
    this.actionTrigerred.emit({ key, row: this.row() });
    this.toggleMenu.emit();
  }
}
