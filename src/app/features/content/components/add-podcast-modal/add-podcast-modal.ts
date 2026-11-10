import { Component, inject, output, signal } from '@angular/core';
import { PodcastCreateModel } from '@/features/content/models/podcasts.model';
import { PodcastFileValidationService } from '@/features/content/services/podcast-file-validation.service';

@Component({
  selector: 'app-add-podcast-modal',
  imports: [],
  templateUrl: './add-podcast-modal.html',
  styleUrl: './add-podcast-modal.css',
})
export class AddPodcastModal {
  private readonly _fileValidation = inject(PodcastFileValidationService);

  closeModal = output<void>();
  confirm = output<PodcastCreateModel>();

  title = signal('');
  description = signal('');
  durationMinutes = signal('');
  audioFile = signal<File | null>(null);
  coverFile = signal<File | null>(null);
  error = signal('');

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal.emit();
    }
  }

  onAudioSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const validationError = this._fileValidation.validateAudioFile(file);

      if (validationError) {
        this.error.set(validationError);
        return;
      }
      this.error.set('');
      this.audioFile.set(file);
    }
  }

  onCoverSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const validationError = this._fileValidation.validateCoverFile(file);

      if (validationError) {
        this.error.set(validationError);
        return;
      }
      this.error.set('');
      this.coverFile.set(file);
    }
  }

  submit(): void {
    if (!this.title() || !this.description() || !this.audioFile()) {
      this.error.set('Les champs Titre, Description et Fichier audio sont obligatoires.');
      return;
    }
    this.error.set('');

    const minutes = Number(this.durationMinutes());
    const durationSeconds =
      this.durationMinutes() && !isNaN(minutes) ? Math.round(minutes * 60) : null;

    this.confirm.emit({
      title: this.title(),
      description: this.description(),
      durationSeconds,
      audioFile: this.audioFile(),
      coverFile: this.coverFile(),
    });
  }
}
