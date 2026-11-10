import { Component } from '@angular/core';
import { ForumDeactivatedContent } from '@/features/forums/components/forum-deactivated-content/forum-deactivated-content';

@Component({
  selector: 'app-forum-deactivated-page',
  imports: [ForumDeactivatedContent],
  template: `<app-forum-deactivated-content></app-forum-deactivated-content>`,
  styles: `
    :host {
      flex: 1;
      padding: 2rem;
      height: 100%;
      margin-top: 5rem;
    }
  `,
})
export class ForumDeactivatedPage {}
