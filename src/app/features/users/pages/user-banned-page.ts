import { Component } from '@angular/core';
import { UserBannedContent } from '@/features/users/components/user-banned-content/user-banned-content';

@Component({
  selector: 'app-user-banned-page',
  imports: [UserBannedContent],
  template: `<app-user-banned-content></app-user-banned-content>`,
  styles: `
    :host {
      flex: 1;
      padding: 2rem;
      height: 100%;
      margin-top: 5rem;
    }
  `,
})
export class UserBannedPage {}
