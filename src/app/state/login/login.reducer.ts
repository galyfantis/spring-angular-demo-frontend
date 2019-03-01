import { Action } from '@ngrx/store';
import { LOGOUT_USER, LOGIN_SUCCESS, LoginUser, LOGIN_USER, LOGIN_FAILURE, LoginFailure } from '../../actions/user/user.actions';

export interface LoginState {
  loading: boolean;
  returnUrl: string;
  error: any;
}

export function loginReducer(state: LoginState, action: Action) {
  switch (action.type) {
    case LOGIN_USER:
      return {loading: true, returnUrl: (action as LoginUser).returnUrl};
    case LOGIN_SUCCESS:
      return {...state, loading: false, error: null};
    case LOGIN_FAILURE:
      return {...state, loading: false, error: (action as LoginFailure).error};
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
}
