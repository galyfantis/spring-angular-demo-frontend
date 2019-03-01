import { User } from '../../_models';
import { Action } from '@ngrx/store';
import * as usersActions from '../../actions/users/users.actions';

export interface UsersState {
  offset: number;
  limit: number;
  users: User[];
  error: any;
}

export function usersReducer(state: UsersState, action: Action) {
  switch (action.type) {
    case usersActions.FETCH_USERS:
      return {...state, offset: (action as usersActions.FetchUsers).offset, limit: (action as usersActions.FetchUsers).limit};
    case usersActions.FETCH_USERS_SUCCESS:
      return {...state, users: (action as usersActions.FetchUsersSuccess).users};
    default:
      return state;
  }
}
