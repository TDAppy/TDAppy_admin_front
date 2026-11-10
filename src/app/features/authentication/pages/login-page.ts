import { Component } from '@angular/core';
import { LoginForm } from '@/features/authentication/components/login-form/login-form';

@Component({
  selector: 'app-login-page',
  imports: [LoginForm],
  template: `
    <div class="login-body">
      <app-login-form></app-login-form>
    </div>
  `,
  styles: `
    .login-body {
      width: 100%;
      max-width: 1400px;
      display: flex;
      border-radius: 25px;
      box-shadow:
        0 0 4px 0 rgb(0 0 0 / 25%),
        0 6px 6px 0 rgb(0 0 0 / 25%);
      padding: 2rem;
      align-items: center;
    }

    app-login-form {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  `,
})
export class LoginPage {}
