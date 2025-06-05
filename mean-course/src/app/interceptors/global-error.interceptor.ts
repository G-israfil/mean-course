import { HttpInterceptorFn } from '@angular/common/http';

export const globalErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe()
  ;
};
