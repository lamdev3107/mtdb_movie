/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from './http-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
  // Thêm các interceptor khác vào đây nếu có
];
