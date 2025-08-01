import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    const alertPopup = confirm('Vui lòng đăng nhập để truy cập trang này!');
    if (alertPopup) {
      this.router.navigate(['/login']);
    }
    return false;
  }
}
