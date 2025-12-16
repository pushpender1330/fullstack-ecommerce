import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
   const router = inject(Router);

  const token = localStorage.getItem('token');

  if(token){
    const authReq = req.clone({
      setHeaders: {
        Authorization : `Bearer ${token}`
      }
    })

    return next(authReq).pipe(
    tap(event => {

    }),
    catchError((err) => {
      console.log(err)
      if(err?.status === 403){
        localStorage.clear();
        router.navigate(['/login'])
      }
      return throwError(()=>err);
    })
  );
  }

  return next(req).pipe(
    tap(event => {

    }),
    catchError((err) => {
      console.log(err)
      if(err?.status === 403){
        localStorage.clear();
        router.navigate(['/login'])
      }
      return throwError(()=>err);
    })
  );
};
