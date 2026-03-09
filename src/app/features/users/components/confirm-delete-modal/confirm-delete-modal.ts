import { Component, HostListener, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-modal',
  imports: [],
  templateUrl: './confirm-delete-modal.html',
  styleUrl: './confirm-delete-modal.css',
})
export class ConfirmDeleteModal {
  title = input.required<string>();
  description = input.required<string>();
  closeModal = output<void>();
  confirm = output<void>();

  @HostListener('document:keydown.escape')
  onEscape():void {
    this.closeModal.emit();
  }

  onOverlayClick(event: MouseEvent):void {
    if (event.target === event.currentTarget) {
      this.closeModal.emit();
    }
  }
}
