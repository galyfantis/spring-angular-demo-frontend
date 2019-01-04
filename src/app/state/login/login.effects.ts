import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LOGIN_SUCCESS, LoginSuccess, LOGIN_FAILURE, LoginFailure } from '../../actions/user/user.actions';
import { map, withLatestFrom, tap } from 'rxjs/operators';
import { Store, Action } from '@ngrx/store';
import { LoginState } from './login.reducer';
import { Router } from '@angular/router';
import { AlertService } from '../../_services';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private router: Router,
    private alertService: AlertService
  ) {}

  @Effect({dispatch: false})
  $loginSuccess = this.actions$
                    .pipe(
                      ofType(LOGIN_SUCCESS),
                      map(a => a as LoginSuccess),
                      withLatestFrom(this.store.select('login')),
                      tap(([action, storeState]) => {
                        const loginState = storeState as LoginState;
                        this.router.navigate([loginState.returnUrl]);
                      })
                    );

  @Effect({dispatch: false})
  $loginError = this.actions$
                    .pipe(
                      ofType(LOGIN_FAILURE),
                      map(a => a as LoginFailure),
                      map(a => a.error),
                      tap(a => this.alertService.error(a))
                    );

}
