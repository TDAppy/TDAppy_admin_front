import { Component } from '@angular/core';
import { ForumListContent } from '@/features/forums/components/forum-list-content/forum-list-content';

@Component({
  selector: 'app-forum-list-page',
  imports: [ForumListContent],
  template: `<app-forum-list-content></app-forum-list-content>`,
  styles: `
    :host {
      flex: 1;
      height: 100%;
      margin-top: 5rem;
    }
  `,
})
export class ForumListPage {}
