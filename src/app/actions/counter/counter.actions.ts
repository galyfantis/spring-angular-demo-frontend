import { Action } from "@ngrx/store";

export const INCREMENT_COUNTER    = '[Counter] Increment';
export const DECREMENT_COUNTER    = '[Counter] Decrement';
export const RESET_COUNTER        = '[Counter] Reset';

export class IncrementCounter implements Action {
  readonly type = INCREMENT_COUNTER;
  constructor() {}
}

export class DecrementCounter implements Action {
  readonly type = DECREMENT_COUNTER;
  constructor() {}
}

export class ResetCounter implements Action {
  readonly type = RESET_COUNTER;
  constructor() {}
}

export type Actions = IncrementCounter | DecrementCounter | ResetCounter;
