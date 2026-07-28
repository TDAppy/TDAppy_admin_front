import { Component, inject, output, signal } from '@angular/core';
import { ResourceCreateModel } from '@/features/content/models/resources.model';
import { ResourceFileValidationService } from '@/features/content/services/resource-file-validation.service';

@Component({
  selector: 'app-add-resource-modal',
  imports: [],
  templateUrl: './add-resource-modal.html',
  styleUrl: './add-resource-modal.css',
})
export class AddResourceModal {
  private readonly _fileValidation = inject(ResourceFileValidationService);

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

  readonly types = this._fileValidation.types;
  readonly themes = this._fileValidation.themes;

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal.emit();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const validationError = this._fileValidation.validateImageFile(file);

      if (validationError) {
        this.error.set(validationError);
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
