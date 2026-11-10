import { Component } from '@angular/core';
import { UserListContent } from '@/features/users/components/user-list-content/user-list-content';

@Component({
  selector: 'app-user-list-page',
  imports: [UserListContent],
  template: `<app-user-list-content></app-user-list-content>`,
  styles: `
    :host {
      flex: 1;
      padding: 2rem;
      height: 100%;
      margin-top: 5rem;
    }
  `,
})
export class UserListPage {}
