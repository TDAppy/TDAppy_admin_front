import { Component } from '@angular/core';
import { PodcastContent } from '@/features/content/components/podcast-content/podcast-content';

@Component({
  selector: 'app-content-podcast-page',
  imports: [PodcastContent],
  template: `<app-podcast-content></app-podcast-content>`,
  styles: `
    :host {
      flex: 1;
      padding: 2rem;
      height: 100%;
      margin-top: 5rem;
    }
  `,
})
export class ContentPodcastPage {}
