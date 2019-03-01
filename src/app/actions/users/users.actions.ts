import { Action } from '@ngrx/store';
import { User } from '../../_models';

export const FETCH_USERS              = '[Users] Fetch users';
export const FETCH_USERS_SUCCESS      = '[Users] Fetch Users Success';
export const FETCH_USERS_FAILURE      = '[Users] Fetch Users Failure';
export const CREATE_USER              = '[Users] Create User';
export const CREATE_USER_SUCCESS      = '[Users] Create User Success';
export const CREATE_USER_FAILURE      = '[Users] Create User Failure';
export const UPDATE_USER              = '[Users] Update User';
export const UPDATE_USER_SUCCESS      = '[Users] Update User Success';
export const UPDATE_USER_FAILURE      = '[Users] Update User Failure';
export const DELETE_USER              = '[Users] Delete User';
export const DELETE_USER_SUCCESS      = '[Users] Delete User Success';
export const DELETE_USER_FAILURE      = '[Users] Delete User Failure';
export const ENABLE_USER              = '[Users] Enable User';
export const ENABLE_USER_SUCCESS      = '[Users] Enable User Success';
export const ENABLE_USER_FAILURE      = '[Users] Enable User Failure';
export const DISABLE_USER             = '[Users] Disable User';
export const DISABLE_USER_SUCCESS     = '[Users] Disable User Success';
export const DISABLE_USER_FAILURE     = '[Users] Disable User Failure';
export const REGISTER_USER            = '[Users] Register User';
export const REGISTER_USER_SUCCESS    = '[Users] Register User Success';
export const REGISTER_USER_FAILURE    = '[Users] Register User Failure';


export class FetchUsers implements Action {
  readonly type = FETCH_USERS;
  constructor(readonly offset: number, readonly limit: number) {}
}

export class FetchUsersSuccess implements Action {
  readonly type = FETCH_USERS_SUCCESS;
  constructor(readonly users: User[]) {}
}

export class FetchUsersFailure implements Action {
  readonly type = FETCH_USERS_FAILURE;
  constructor(readonly error: any) {}
}

export class CreateUser implements Action {
  readonly type = CREATE_USER;
  constructor(readonly user: User) {}
}

export class CreateUserSuccess implements Action {
  readonly type = CREATE_USER_SUCCESS;
  constructor() {}
}

export class CreateUserFailure implements Action {
  readonly type = CREATE_USER_FAILURE;
  constructor(readonly error: any) {}
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;
  constructor(readonly user: User) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = UPDATE_USER_SUCCESS;
  constructor() {}
}

export class UpdateUserFailure implements Action {
  readonly type = UPDATE_USER_FAILURE;
  constructor(readonly error: any) {}
}

export class DeleteUser implements Action {
  readonly type = DELETE_USER;
  constructor(readonly username: string) {}
}

export class DeleteUserSuccess implements Action {
  readonly type = DELETE_USER_SUCCESS;
  constructor() {}
}

export class DeleteUserFailure implements Action {
  readonly type = DELETE_USER_FAILURE;
  constructor(readonly error: any) {}
}

export class EnableUser implements Action {
  readonly type = ENABLE_USER;
  constructor(readonly username: string) {}
}

export class EnableUserSuccess implements Action {
  readonly type = ENABLE_USER_SUCCESS;
  constructor() {}
}

export class EnableUserFailure implements Action {
  readonly type = ENABLE_USER_FAILURE;
  constructor(readonly error: any) {}
}

export class DisableUser implements Action {
  readonly type = DISABLE_USER;
  constructor(readonly username: string) {}
}

export class DisableUserSuccess implements Action {
  readonly type = DISABLE_USER_SUCCESS;
  constructor() {}
}

export class DisableUserFailure implements Action {
  readonly type = DISABLE_USER_FAILURE;
  constructor(readonly error: any) {}
}

export class RegisterUser implements Action {
  readonly type = REGISTER_USER;
  constructor(readonly user: User) {}
}

export class RegisterUserSuccess implements Action {
  readonly type = REGISTER_USER_SUCCESS;
  constructor() {}
}

export class RegisterUserFailure implements Action {
  readonly type = REGISTER_USER_FAILURE;
  constructor(readonly error: any) {}
}
