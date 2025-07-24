import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';

export const DEFAULT_TIMEOUT = 30000;

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Thêm baseUrl nếu url là relative (không bắt đầu bằng http hoặc https)
    const apiUrl = environment.apiUrl + req.url;

    const clonedRequest = req.clone({
      url: apiUrl,
      setHeaders: {
        Authorization: `Bearer ${environment.apiKey}`, // giả lập token
      },
    });

    return next.handle(clonedRequest).pipe(
      timeout(DEFAULT_TIMEOUT),
      tap({
        next: (event) => {
          // console.log('✅ Response received');
        },
        error: (error: HttpErrorResponse) => {},
      }),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          // case 401:
          //   this.router.navigate(['/login']);
          //   throw error;
          case 400:
            console.log('Check ', error);
            alert('Đăng nhập thất bại! Vui lòng thử lại');
            break;
          case 401:
            // Lỗi 401 Unauthorized: Người dùng chưa được xác thực hoặc token hết hạn/không hợp lệ
            alert(
              'Unauthorized: Your session has expired or is invalid. Please log in again.'
            );
            // this.authService.logout(); // Gọi hàm đăng xuất để xóa token, v.v.
            this.router.navigate(['/login']); // Chuyển hướng về trang đăng nhập
            break;
          case 403:
            // Lỗi 403 Forbidden: Đã xác thực nhưng không có quyền truy cập tài nguyên
            alert(
              'Forbidden: You do not have permission to access this resource.'
            );
            this.router.navigate(['/access-denied']); // Chuyển hướng đến trang báo lỗi quyền truy cập
            break;
          case 500:
            // Lỗi 500 Internal Server Error: Lỗi server chung
            alert('Internal Server Error: Something went wrong on the server.');
            break;
          default:
            // Các lỗi khác
            alert('An unexpected error occurred. Please try again.');
            break;
        }

        return throwError(() => error);
      })
    );
  }
}
