import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const logoutGuard: CanActivateFn = () => {

  const auth = inject(AuthService);
  const router = inject(Router);

  auth.logout();

  router.navigate(['/login']);

  return false;
};
