import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { ResetCounter, INCREMENT_COUNTER, DECREMENT_COUNTER, RESET_COUNTER } from '../../actions/counter/counter.actions';

@Injectable()
export class CounterEffects {
  constructor(
    private actions$: Actions
  ) {}

  @Effect({dispatch: false})
  increment$ = this.actions$
                .pipe(
                  ofType(INCREMENT_COUNTER),
                  tap(a => {})
                );

  @Effect({dispatch: false})
  decrement$ = this.actions$
                .pipe(
                  ofType(DECREMENT_COUNTER),
                  tap(a => {})
                );

  @Effect({dispatch: false})
  reset$ = this.actions$
                .pipe(
                  ofType(RESET_COUNTER),
                  tap(a => {})
                );
}
