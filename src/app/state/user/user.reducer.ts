import { ActionReducer, Action } from '@ngrx/store';
import { FETCH_CURRENT_USER_SUCCESS, FetchCurrentUserSuccess, LOGOUT_USER,
  LOGIN_SUCCESS, LoginSuccess } from '../../actions/user/user.actions';
import { User } from '../../_models';

export function userReducer(state: User, action: Action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, auth: {token: (action as LoginSuccess).token}};
    case FETCH_CURRENT_USER_SUCCESS:
      return {...state, details: (action as FetchCurrentUserSuccess).userDetails};
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
}
