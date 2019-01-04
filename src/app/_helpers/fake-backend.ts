import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, materialize, delay, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    return of(null).pipe(mergeMap(() => {

/*
      if(request.url.endsWith('/api/users/authenticate') && request.method === 'POST') {
        let filteredUsers = users.filter(user => {
          return user.username === request.body.username && user.password === request.body.password;
        });

        if (filteredUsers.length) {
          let user = filteredUsers[0];
          let body = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token: 'fake-jwt-token'
          };
          return of(new HttpResponse({status: 200, body: body}));
        } else {
          return throwError({error: {message: 'Username or password incorrect'}});
        }
      }
*/
/*
      if (request.url.endsWith('/users') && request.method === 'GET') {
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          return of(new HttpResponse({status: 200, body: users}));
        } else {
          return throwError({error: {message: 'Unauthorized'}});
        }
      }
      */

      if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          let matchedUser = users.filter(user => user.id === id);
          let user = matchedUser.length ? matchedUser[0] : null;

          return of(new HttpResponse({status: 200, body: user}));
        } else {
          return throwError({error: {message: 'Unauthorized'}});
        }
      }

      /*
      if (request.url.endsWith('/users/register') && request.method === 'POST') {
        let newUser = request.body;

        let duplicatedUser = users.filter(user => user.username === newUser.username).length;
        if (duplicatedUser) {
          return throwError({error: {message: 'Username "' + newUser.username + '" is already taken'}});
        }

        newUser.id = users.length + 1;
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        return of(new HttpResponse({status: 200}))
      }
      */

      if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (user.id === id) {
              users.splice(i, 1);
              localStorage.setItem('users', JSON.stringify(users));
              break;
            }
          }

          return of(new HttpResponse({status: 200}));
        } else {
          return throwError({error: {message: 'Unauthorized'}});
        }
      }

      return next.handle(request);
    }))

    .pipe(materialize())
    .pipe(delay(500))
    .pipe(dematerialize());
  }

}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};


