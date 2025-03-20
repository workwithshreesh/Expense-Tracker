import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    const isAuthPage = state.url === '/login' || state.url === '/register';

    if (isAuthenticated && isAuthPage) {
      this.router.navigate(['/']);  
      return false;
    } else if (!isAuthenticated && !isAuthPage) {
      this.router.navigate(['/login']);  
      return false;
    }

    return true;
  }
}
