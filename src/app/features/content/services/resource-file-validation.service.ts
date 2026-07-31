import { Injectable } from '@angular/core';

export const RESOURCE_TYPES = ['ADMINISTRATIVE', 'MEDICAL', 'PSYCHOEDUCATION'];
export const RESOURCE_THEMES = ['CHILDREN', 'ADULTS'];

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

/**
 * Factorise la validation de fichier image et les listes de types/thèmes de ressource, auparavant
 * dupliquées à l'identique entre AddResourceModal et UpdateResourceModal.
 */
@Injectable({ providedIn: 'root' })
export class ResourceFileValidationService {
  readonly types = RESOURCE_TYPES;
  readonly themes = RESOURCE_THEMES;

  /**
   * Valide le type MIME et la taille d'un fichier image de ressource.
   * Retourne un message d'erreur en français si le fichier est invalide, ou `null` s'il est accepté.
   */
  validateImageFile(file: File): string | null {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return 'Format non autorisé. Formats acceptés : JPG, PNG, WEBP';
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return 'La taille du fichier ne doit pas dépasser 5MB';
    }
    return null;
  }
}
