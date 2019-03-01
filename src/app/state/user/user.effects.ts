import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { AuthenticationService, UserService } from '../../_services';
import { LOGIN_USER, LoginUser, LoginSuccess, LOGIN_SUCCESS, FetchCurrentUser,
  FETCH_CURRENT_USER, FetchCurrentUserSuccess, LOGOUT_USER, LogoutUser, LoginFailure } from '../../actions/user/user.actions';
import { throwError, of } from 'rxjs';
import { User } from '../../_models';

@Injectable()
export class UserEffects {
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private actions$: Actions
  ) {}

  @Effect()
  login$ = this.actions$
            .pipe(
              ofType(LOGIN_USER),
              map(a => a as LoginUser),
              switchMap(a => {
                return this.authenticationService.login(a.username, a.password)
                  .pipe(
                    map(tokenResponse => {
                      if (tokenResponse && tokenResponse.token) {
                        return new LoginSuccess(tokenResponse.username, tokenResponse.token);
                      }
                      return throwError({error: {message: 'Error getting an authentication token'}});
                    }),
                    catchError((error) => of(new LoginFailure(error)))
                  );
              }),
            );

  @Effect()
  loginSuccess$ = this.actions$
                .pipe(
                  ofType(LOGIN_SUCCESS),
                  map(a => a as LoginSuccess),
                  tap(a => localStorage.setItem('currentUserToken', a.token)),
                  map(a => new FetchCurrentUser()),
                );

  @Effect()
  fetchCurrentUser$ = this.actions$
                  .pipe(
                    ofType(FETCH_CURRENT_USER),
                    map(a => a as FetchCurrentUser),
                    switchMap(a => {
                      return this.userService.getCurrentUser();
                    }),
                    map(a => new FetchCurrentUserSuccess(a))
                  );

  @Effect()
  logout$ = this.actions$
                  .pipe(
                    ofType(LOGOUT_USER),
                    map(a => a as LogoutUser),
                    tap($ => this.authenticationService.logout()),
                    map(a => new FetchCurrentUserSuccess(new User()))
                  );
}
