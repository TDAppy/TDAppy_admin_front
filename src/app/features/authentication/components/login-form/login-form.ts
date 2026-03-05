import { Component, inject } from '@angular/core';
import { IconsModule } from '@/shared/icons/icons.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginFacade } from '@/features/authentication/services/login/login-facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [IconsModule, ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  readonly facade = inject(LoginFacade);

  readonly isLoading = this.facade.isLoading;
  readonly error = this.facade.error;

  showPassword = false;

  loginForm = this._fb.nonNullable.group({
    identifier: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { identifier, password } = this.loginForm.getRawValue();
    const success = await this.facade.login({ identifier, password });
    if (success) {
      await this._router.navigate(['/dashboard']);
    }
  }
}
