import { Injectable } from '@angular/core';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

// Doit rester cohérent avec FileStorageService côté TDAppy_api (types acceptés + taille max).
const ALLOWED_AUDIO_TYPES = [
  'audio/mpeg',
  'audio/mp3',
  'audio/x-mp3',
  'audio/wav',
  'audio/x-wav',
  'audio/vnd.wave',
  'audio/mp4',
  'audio/x-m4a',
  'audio/m4a',
  'audio/aac',
  'audio/ogg',
];
const MAX_AUDIO_SIZE = 150 * 1024 * 1024;

/**
 * Validation des fichiers d'un épisode de podcast : le fichier audio (obligatoire à la création)
 * et la jaquette (optionnelle), avant envoi au backend.
 */
@Injectable({ providedIn: 'root' })
export class PodcastFileValidationService {
  validateAudioFile(file: File): string | null {
    if (!ALLOWED_AUDIO_TYPES.includes(file.type)) {
      return 'Format non autorisé. Formats acceptés : MP3, WAV, M4A, OGG';
    }
    if (file.size > MAX_AUDIO_SIZE) {
      return 'La taille du fichier audio ne doit pas dépasser 150MB';
    }
    return null;
  }

  validateCoverFile(file: File): string | null {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return 'Format non autorisé. Formats acceptés : JPG, PNG, WEBP';
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return 'La taille de la jaquette ne doit pas dépasser 5MB';
    }
    return null;
  }
}
