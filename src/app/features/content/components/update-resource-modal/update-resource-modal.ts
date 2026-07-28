import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { ResourceCreateModel, ResourcesModel } from '@/features/content/models/resources.model';
import { ResourceFileValidationService } from '@/features/content/services/resource-file-validation.service';

@Component({
  selector: 'app-update-resource-modal',
  imports: [],
  templateUrl: './update-resource-modal.html',
  styleUrl: './update-resource-modal.css',
})
export class UpdateResourceModal implements OnInit {
  private readonly _fileValidation = inject(ResourceFileValidationService);

  resource = input.required<ResourcesModel>();
  closeModal = output<void>();
  confirm = output<{ payload: ResourceCreateModel; file: File | null }>();

  title = signal('');
  content = signal('');
  type = signal('');
  description = signal('');
  reference = signal('');
  theme = signal('');
  selectedFile = signal<File | null>(null);
  error = signal('');

  readonly types = this._fileValidation.types;
  readonly themes = this._fileValidation.themes;

  ngOnInit(): void {
    this.title.set(this.resource().title);
    this.content.set(this.resource().content);
    this.type.set(this.resource().type);
    this.description.set(this.resource().description ?? '');
    this.reference.set(this.resource().reference ?? '');
    this.theme.set(this.resource().theme);
  }

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
      payload: {
        title: this.title(),
        content: this.content(),
        file: this.selectedFile(),
        type: this.type(),
        description: this.description(),
        reference: this.reference(),
        theme: this.theme(),
      },
      file: this.selectedFile(),
    });
  }
}
