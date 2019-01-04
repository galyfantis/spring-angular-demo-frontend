import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../_models';
import { map, filter, tap } from 'rxjs/operators';

@Component({
  templateUrl: 'menu.component.html',
  selector: 'menu-items'
})
export class MenuComponent implements OnInit {

  private menu: Observable<any[]>;

  private loggedInUserDisplay: Observable<string>;

  constructor(private store: Store<any>) {
    this.menu = store.select('user').pipe(map(u => this.toMenuItems(u)));
    this.loggedInUserDisplay = store.select('user').pipe(map(u => this.toUserDisplay(u)));
  }

  private toUserDisplay(userDetails: any) {
    if (!userDetails || !userDetails.details) {
      return null;
    }
    if (!userDetails.details.username) {
      return null;
    }
    return userDetails.details.firstName + ' ' + userDetails.details.lastName;
  }

  private toMenuItems(userDetails: any) {
    if (!userDetails || !userDetails.details || !userDetails.details.username) {
      return  [
        {lbl: 'Login', path: '/login'},
        {lbl: 'Register', path: '/register'}
      ];
    }

    if (userDetails.details.roles.includes('ADMIN')) {
      return  [{lbl: 'Home', path: '/'},
        {lbl: 'Articles', path: '/articles'},
        {lbl: 'Users', path: '/users'},
        {lbl: 'Counter', path: '/counter'},
        {lbl: 'Logout', path: '/login'}
      ];
    }

    return  [{lbl: 'Home', path: '/'},
          {lbl: 'Articles', path: '/articles'},
          {lbl: 'Users', path: '/users'},
          {lbl: 'Counter', path: '/counter'},
          {lbl: 'Logout', path: '/login'}
      ];
  }

  ngOnInit() {
  }

}
