import { Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap, timeout } from 'rxjs';

export const DEFAULT_TIMEOUT = 30000;

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('🔥 Interceptor activated for:', req.url);

    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer Bring-my-token`, // giả lập token
        msgId: Math.ceil(Date.now()).toString(),
        creDtTm: new Date().toISOString(),
      },
    });

    return next.handle(clonedRequest).pipe(
      timeout(DEFAULT_TIMEOUT),
      tap({
        next: (event) => {
          // log hoặc xử lý response nếu cần
          console.log('✅ Response received');
        },
        error: (error: HttpErrorResponse) => {
          console.error('❌ HTTP error:', error.message);
        },
      })
    );
  }
}
