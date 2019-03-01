import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../../_services';

import * as usersActions from '../../actions/users/users.actions';
import { switchMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RegisterState } from './register.reducer';

@Injectable()
export class RegisterEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<any>,
    private router: Router,
    private alertService: AlertService
  ) {}

  @Effect()
  registerUser$ = this.actions$
            .pipe(
              ofType<usersActions.RegisterUser>(usersActions.REGISTER_USER),
              switchMap(a => {
                return this.userService.register(a.user)
                  .pipe(
                    map(() => new usersActions.RegisterUserSuccess()),
                    catchError((error) => of(new usersActions.RegisterUserFailure(error)))
                  );
              }),
            );

  @Effect({dispatch: false})
  $registerUserSuccess = this.actions$
                    .pipe(
                      ofType<usersActions.RegisterUserSuccess>(usersActions.REGISTER_USER_SUCCESS),
                      tap(a => this.alertService.success('User registered successfuly')),
                      tap(a => this.router.navigate(['/login']))
                    );

  @Effect({dispatch: false})
  $registerUserFailure = this.actions$
                    .pipe(
                      ofType<usersActions.RegisterUserFailure>(usersActions.REGISTER_USER_FAILURE),
                      tap(a => this.alertService.error(a.error))
                    );
}
