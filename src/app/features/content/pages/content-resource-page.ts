import { Component } from '@angular/core';
import { ResourceContent } from '@/features/content/components/resource-content/resource-content';

@Component({
  selector: 'app-content-resource-page',
  imports: [ResourceContent],
  template: `<app-resource-content></app-resource-content>`,
  styles: `
    :host {
      flex: 1;
      padding: 2rem;
      height: 100%;
      margin-top: 5rem;
    }
  `,
})
export class ContentResourcePage {}
