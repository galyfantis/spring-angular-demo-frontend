import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FetchCurrentUser } from './actions/user/user.actions';

@Component({
   selector: 'app',
   templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private store: Store<any>) {}

  ngOnInit() {
    console.log('Initializing app!');
    if (localStorage.getItem('currentUserToken')) {
      this.store.dispatch(new FetchCurrentUser());
    }
  }
}
