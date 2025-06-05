import { HttpInterceptorFn } from '@angular/common/http';
import {catchError} from "rxjs";
import {SnackbarService} from "../services/snackbar.service";
import {inject} from "@angular/core";

export const globalErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBarService: SnackbarService = inject(SnackbarService);
  return next(req).pipe(
    catchError((err) => {
      snackBarService.showSnackBar(err.error?.message ?? "Error occurred while sending request.");
      throw err;
    })
  )
};
