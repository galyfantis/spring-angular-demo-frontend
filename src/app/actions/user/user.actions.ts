import { Action } from '@ngrx/store';
import { User } from '../../_models';

export const LOGIN_USER                 = '[User] Login';
export const LOGIN_SUCCESS              = '[User] Login Success';
export const LOGIN_FAILURE              = '[User] Login Failure';
export const FETCH_CURRENT_USER         = '[User] Fetch Current User';
export const FETCH_CURRENT_USER_SUCCESS = '[User] Fetch Current User Success';
export const LOGOUT_USER                = '[User] Logout';

export class LoginUser implements Action {
  readonly type = LOGIN_USER;
  constructor(readonly username: string, readonly password: string, readonly returnUrl: string) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(readonly username: string, readonly token: string) {}
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;
  constructor(readonly error) {}
}

export class FetchCurrentUser implements Action {
  readonly type = FETCH_CURRENT_USER;
  constructor() {}
}

export class FetchCurrentUserSuccess implements Action {
  readonly type = FETCH_CURRENT_USER_SUCCESS;
  constructor(readonly userDetails: User) {}
}

export class LogoutUser implements Action {
  readonly type = LOGOUT_USER;
  constructor() {}
}

export type Actions = LoginUser | LoginSuccess | LoginFailure | FetchCurrentUser | FetchCurrentUserSuccess | LogoutUser;
