import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UserService, AlertService } from '../../_services';
import * as usersActions from '../../actions/users/users.actions';
import { switchMap, map, catchError, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersState } from './users.reducer';

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  @Effect()
  fetchUsers$ = this.actions$
                    .pipe(
                      ofType<usersActions.FetchUsers>(usersActions.FETCH_USERS),
                      switchMap(a => {
                        return this.userService.getAll()
                                  .pipe(
                                    map(users => new usersActions.FetchUsersSuccess(users)),
                                    catchError(error => of(new usersActions.FetchUsersFailure(error)))
                                  );
                      })
                    );

  @Effect({dispatch: false})
  fetchUsersFailure$ = this.actions$
                    .pipe(
                      ofType<usersActions.FetchUsersFailure>(usersActions.FETCH_USERS_FAILURE),
                      tap(a => this.alertService.error(a.error))
                    );

  @Effect()
  createUser$ = this.actions$
                    .pipe(
                      ofType<usersActions.CreateUser>(usersActions.CREATE_USER),
                      switchMap(a => {
                        return this.userService.create(a.user)
                                  .pipe(
                                    map(users => new usersActions.CreateUserSuccess()),
                                    catchError(error => of(new usersActions.CreateUserFailure(error)))
                                  );
                      })
                    );

  @Effect({dispatch: false})
  createUserFailure$ = this.actions$
                    .pipe(
                      ofType<usersActions.CreateUserFailure>(usersActions.CREATE_USER_FAILURE),
                      tap(a => this.alertService.error(a.error))
                    );

  @Effect()
  createUserSuccess$ = this.actions$
                      .pipe(
                        ofType<usersActions.CreateUserSuccess>(usersActions.CREATE_USER_SUCCESS),
                        tap(a => this.alertService.success('User created')),
                        withLatestFrom(this.store.select<UsersState>('users')),
                        map(([action, usersState]) => {
                          console.log(action, usersState);
                          return new usersActions.FetchUsers(usersState.offset, usersState.limit);
                        }
                      ));


  @Effect()
  updateUser$ = this.actions$
                    .pipe(
                      ofType<usersActions.UpdateUser>(usersActions.UPDATE_USER),
                      switchMap(a => {
                        return this.userService.update(a.user)
                                  .pipe(
                                    map(users => new usersActions.UpdateUserSuccess()),
                                    catchError(error => of(new usersActions.UpdateUserFailure(error)))
                                  );
                      })
                    );

  @Effect({dispatch: false})
  updateUserFailure$ = this.actions$
                    .pipe(
                      ofType<usersActions.UpdateUserFailure>(usersActions.UPDATE_USER_FAILURE),
                      tap(a => this.alertService.error(a.error))
                    );

  @Effect()
  updateUserSuccess$ = this.actions$
                      .pipe(
                        ofType<usersActions.UpdateUserSuccess>(usersActions.UPDATE_USER_SUCCESS),
                        tap(a => this.alertService.success('User updated')),
                        withLatestFrom(this.store.select<UsersState>('users')),
                        map(([action, usersState]) => {
                          console.log(action, usersState);
                          return new usersActions.FetchUsers(usersState.offset, usersState.limit);
                        }
                      ));



  @Effect()
  deleteUser$ = this.actions$
                    .pipe(
                      ofType<usersActions.DeleteUser>(usersActions.DELETE_USER),
                      switchMap(a => {
                        return this.userService.delete(a.username)
                                  .pipe(
                                    map(users => new usersActions.DeleteUserSuccess()),
                                    catchError(error => of(new usersActions.DeleteUserFailure(error)))
                                  );
                      })
                    );

  @Effect({dispatch: false})
  deleteUserFailure$ = this.actions$
                    .pipe(
                      ofType<usersActions.DeleteUserFailure>(usersActions.DELETE_USER_FAILURE),
                      tap(a => this.alertService.error(a.error))
                    );

  @Effect()
  deleteUserSuccess$ = this.actions$
                      .pipe(
                        ofType<usersActions.DeleteUserSuccess>(usersActions.DELETE_USER_SUCCESS),
                        tap(a => this.alertService.warning('User deleted')),
                        withLatestFrom(this.store.select<UsersState>('users')),
                        map(([action, usersState]) => {
                          console.log(action, usersState);
                          return new usersActions.FetchUsers(usersState.offset, usersState.limit);
                        }
                      ));


  @Effect()
  enableUser$ = this.actions$
                    .pipe(
                      ofType<usersActions.EnableUser>(usersActions.ENABLE_USER),
                      switchMap(a => {
                        return this.userService.enable(a.username)
                                  .pipe(
                                    map(users => new usersActions.EnableUserSuccess()),
                                    catchError(error => of(new usersActions.EnableUserFailure(error)))
                                  );
                      })
                    );

  @Effect({dispatch: false})
  enableUserFailure$ = this.actions$
                    .pipe(
                      ofType<usersActions.EnableUserFailure>(usersActions.ENABLE_USER_FAILURE),
                      tap(a => this.alertService.error(a.error))
                    );

  @Effect()
  enableUserSuccess$ = this.actions$
                      .pipe(
                        ofType<usersActions.EnableUserSuccess>(usersActions.ENABLE_USER_SUCCESS),
                        tap(a => this.alertService.success('User enabled')),
                        withLatestFrom(this.store.select<UsersState>('users')),
                        map(([action, usersState]) => {
                          console.log(action, usersState);
                          return new usersActions.FetchUsers(usersState.offset, usersState.limit);
                        }
                      ));

  @Effect()
  disableUser$ = this.actions$
                    .pipe(
                      ofType<usersActions.DisableUser>(usersActions.DISABLE_USER),
                      switchMap(a => {
                        return this.userService.disable(a.username)
                                  .pipe(
                                    map(users => new usersActions.DisableUserSuccess()),
                                    catchError(error => of(new usersActions.DisableUserFailure(error)))
                                  );
                      })
                    );

  @Effect({dispatch: false})
  disableUserFailure$ = this.actions$
                    .pipe(
                      ofType<usersActions.DisableUserFailure>(usersActions.DISABLE_USER_FAILURE),
                      tap(a => this.alertService.error(a.error))
                    );

  @Effect()
  disableUserSuccess$ = this.actions$
                      .pipe(
                        ofType<usersActions.DisableUserSuccess>(usersActions.DISABLE_USER_SUCCESS),
                        tap(a => this.alertService.warning('User disabled')),
                        withLatestFrom(this.store.select<UsersState>('users')),
                        map(([action, usersState]) => {
                          console.log(action, usersState);
                          return new usersActions.FetchUsers(usersState.offset, usersState.limit);
                        }
                      ));
}
