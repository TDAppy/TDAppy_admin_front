import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginStore } from '@/features/authentication/services/login/login-store';

export const authGuard: CanActivateFn = () => {
  const loginStore = inject(LoginStore)
  const router = inject(Router)

  if (loginStore.getToken()){
    return true;
  }

  return router.createUrlTree(['']);
};
