import { Component, output, signal } from '@angular/core';
import { ResourceCreateModel } from '@/features/content/models/resources.model';

@Component({
  selector: 'app-add-resource-modal',
  imports: [],
  templateUrl: './add-resource-modal.html',
  styleUrl: './add-resource-modal.css',
})
export class AddResourceModal {
  closeModal = output<void>();
  confirm = output<ResourceCreateModel>();

  title = signal('');
  content = signal('');
  selectedFile = signal<File | null>(null);
  type = signal('');
  description = signal('');
  reference = signal('');
  theme = signal('');
  error = signal('');

  types = ['ADMINISTRATIVE', 'MEDICAL', 'PSYCHOEDUCATION'];
  themes = ['CHILDREN', 'ADULTS'];

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal.emit();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const maxSize = 5 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        this.error.set('Format non autorisé. Formats acceptés : JPG, PNG, WEBP');
        return;
      }
      if (file.size > maxSize) {
        this.error.set('La taille du fichier ne doit pas dépasser 5MB');
        return;
      }
      this.error.set('');
      this.selectedFile.set(file);
    }
  }

  submit(): void {
    if (!this.title() || !this.content() || !this.type() || !this.theme()) {
      this.error.set('Les champs Titre, Contenu, Type et Thème sont obligatoires.');
      return;
    }
    this.error.set('');
    this.confirm.emit({
      title: this.title(),
      content: this.content(),
      file: this.selectedFile(),
      type: this.type(),
      description: this.description(),
      reference: this.reference(),
      theme: this.theme(),
    });
  }
}
