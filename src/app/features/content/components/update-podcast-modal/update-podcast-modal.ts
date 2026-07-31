import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { PodcastCreateModel, PodcastModel } from '@/features/content/models/podcasts.model';
import { PodcastFileValidationService } from '@/features/content/services/podcast-file-validation.service';

@Component({
  selector: 'app-update-podcast-modal',
  imports: [],
  templateUrl: './update-podcast-modal.html',
  styleUrl: './update-podcast-modal.css',
})
export class UpdatePodcastModal implements OnInit {
  private readonly _fileValidation = inject(PodcastFileValidationService);

  podcast = input.required<PodcastModel>();
  closeModal = output<void>();
  confirm = output<PodcastCreateModel>();

  title = signal('');
  description = signal('');
  durationMinutes = signal('');
  audioFile = signal<File | null>(null);
  coverFile = signal<File | null>(null);
  error = signal('');

  ngOnInit(): void {
    this.title.set(this.podcast().title);
    this.description.set(this.podcast().description);
    const seconds = this.podcast().durationSeconds;
    this.durationMinutes.set(seconds ? String(Math.round(seconds / 60)) : '');
  }

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
    if (!this.title() || !this.description()) {
      this.error.set('Les champs Titre et Description sont obligatoires.');
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
