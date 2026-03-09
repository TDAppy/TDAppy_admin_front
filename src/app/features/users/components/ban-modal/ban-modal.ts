import { Component, HostListener, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-ban-modal',
  imports: [],
  templateUrl: './ban-modal.html',
  styleUrl: './ban-modal.css',
})
export class BanModal {
  username = input.required<string>();
  closeModal = output<void>();
  confirm = output<{ bannedUntil: string | null }>();
  error = signal('');

  isPermanent = signal(false);
  bannedUntil = signal('');

  @HostListener('document:keydown.escape')
  onEscape():void {
    this.closeModal.emit();
  }

  togglePermanent() :void{
    this.isPermanent.set(!this.isPermanent());
    if (this.isPermanent()) this.bannedUntil.set('');
  }

  onOverlayClick(event: MouseEvent):void {
    if (event.target === event.currentTarget) {
      this.closeModal.emit();
    }
  }

  submit():void{
    if(!this.isPermanent() && !this.bannedUntil()) {
      this.error.set('Veuillez sélectionner une date ou cocher "Ban permanent".')
      return;
    }
    this.error.set('');
    this.confirm.emit({
      bannedUntil: this.isPermanent() ? null : this.bannedUntil()
    });
  }
}
