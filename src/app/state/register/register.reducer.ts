import { State, Action } from '@ngrx/store';

import * as usersActions from '../../actions/users/users.actions';

export interface RegisterState {
  loading: boolean;
  error: any;
}

export function registerReducer(state: State<RegisterState>, action: Action) {

  switch (action.type) {
    case usersActions.REGISTER_USER:
      return {loading: true};
    case usersActions.REGISTER_USER_SUCCESS:
      return {loading: false, error: null};
    case usersActions.REGISTER_USER_FAILURE:
      return {loading: false, error: (action as usersActions.RegisterUserFailure).error};
    default:
      return state;
  }
}
