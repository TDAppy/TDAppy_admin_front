import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { ResourceCreateModel, ResourcesModel } from '@/features/content/models/resources.model';
import { ResourceFileValidationService } from '@/features/content/services/resource-file-validation.service';
import { ContentChange, QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-update-resource-modal',
  imports: [QuillEditorComponent],
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
  // Contenu HTML d'origine de la ressource, injecté une seule fois dans Quill via
  // onEditorCreated (voir plus bas) — distinct du signal `content`, qui lui est mis à jour à
  // chaque frappe par onContentChanged.
  protected initialContent = '';
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
    this.initialContent = this.resource().content;
    this.type.set(this.resource().type);
    this.description.set(this.resource().description ?? '');
    this.reference.set(this.resource().reference ?? '');
    this.theme.set(this.resource().theme);
  }

  onContentChanged(event: ContentChange): void {
    this.content.set(event.html ?? '');
  }

  /**
   * ngx-quill n'expose pas `content` comme @Input() — seule la voie ControlValueAccessor
   * (ngModel/formControlName) le permettrait. Pour rester sur le style signal simple déjà utilisé
   * ici, on injecte le HTML initial directement dans l'instance Quill dès sa création.
   */
  onEditorCreated(editor: { clipboard: { dangerouslyPasteHTML(html: string): void } }): void {
    if (this.initialContent) {
      editor.clipboard.dangerouslyPasteHTML(this.initialContent);
    }
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
