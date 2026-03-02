import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  error = signal<string | null>(null);

  notify(message: string): void {
    this.error.set(message);
  }
}
