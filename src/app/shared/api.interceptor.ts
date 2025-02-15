import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  if (authService.isSignedIn()) {
    const colonedReq = req.clone({
      'headers': req.headers.set('Authorization', 'Bearer ' + authService.getToken())
    })
    return next(colonedReq);
  }
  else
    return next(req);
};
