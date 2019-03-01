import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ResetCounter, IncrementCounter, DecrementCounter } from '../actions/counter/counter.actions';

interface AppState {
  counter: number;
}

@Component({templateUrl: 'counter.component.html'})
export class CounterComponent implements OnInit {

  private counter: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.counter = store.select('counter');
  }

  ngOnInit() {
    this.store.dispatch(new ResetCounter());
  }

  increment() {
    this.store.dispatch(new IncrementCounter());
  }

  decrement() {
    this.store.dispatch(new DecrementCounter());
  }

  reset() {
    this.store.dispatch(new ResetCounter());
  }

}
