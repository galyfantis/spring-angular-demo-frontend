import { ActionReducer, Action } from '@ngrx/store';
import { INCREMENT_COUNTER, DECREMENT_COUNTER, RESET_COUNTER } from '../../actions/counter/counter.actions';

export function counterReducer(state: number, action: Action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    case RESET_COUNTER:
      return 0;
    default:
      return state;
  }
}
