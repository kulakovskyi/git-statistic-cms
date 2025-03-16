import {
  HttpErrorResponse,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { environment } from '@environment/environment';
import { MessageService } from 'primeng/api';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '@services/auth.service';

export const AppInterceptor: HttpInterceptorFn = (req, next) => {
  let BASE_URL = environment.apiUrl;
  const messageService: MessageService = inject(MessageService);
  const token = inject(AuthService).getAuthFromLocalStorage();

  if (req.url.includes('access_token')) {
    BASE_URL = environment.authUrl;
  }

  const nextRequest = req.clone({
    headers: prepareHeaders(req),
    url: assignRequestURL(req),
  });

  return next(nextRequest).pipe(
    catchError((err: HttpErrorResponse) => {
      messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: err.error?.error,
      });

      return throwError(() => err);
    }),
  );

  function assignRequestURL(request: HttpRequest<unknown>): string {
    if (request.url.includes('/assets/i18n/')) {
      return `${request.url}`;
    } else {
      return `${BASE_URL}${request.url}`;
    }
  }

  function prepareHeaders(request: HttpRequest<unknown>) {
    let headers: HttpHeaders = request.headers;

    if (!headers.get('no-auth')) {
      headers = headers.append('Authorization', 'Bearer ' + token);
    } else {
      headers = headers.delete('no-auth');
    }
    //
    // if (headers.has('no-type')) {
    //   headers = headers.delete('no-type');
    //   headers = headers.delete('content-type');
    // } else if (!headers.get('content-type')) {
    //   headers = headers.append('content-type', 'application/json');
    // }
    // if (headers.has('customlink')) {
    //   headers = headers.delete('customlink');
    // }

    return headers;
  }
};
