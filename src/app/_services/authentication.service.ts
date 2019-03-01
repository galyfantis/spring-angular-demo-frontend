import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LogoutUser } from '../actions/user/user.actions';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private store: Store<any>) {}

  login(username: string, password: string) {
    return this.http.post<any>('/api/auth/authenticate', {username: username, password: password});
  }

  logout() {
    // this.store.dispatch(new LogoutUser());
    localStorage.removeItem('currentUserToken');
  }
}
