import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUserToken = localStorage.getItem('currentUserToken');
    if (currentUserToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${currentUserToken}`
          //Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    return next.handle(request);
  }

}
