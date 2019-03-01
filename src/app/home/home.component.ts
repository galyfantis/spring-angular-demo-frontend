import { OnInit, Component, ViewChild } from '@angular/core';
import { User } from '../_models';
import { UserService } from '../_services';
import { first, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FetchCurrentUser } from '../actions/user/user.actions';
import * as usersActions from '../actions/users/users.actions';
import { NgbdUserModalComponent } from './user-modal';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
  currentUser: User;
  private users: Observable<User[]>;

  @ViewChild(NgbdUserModalComponent)
  modal: NgbdUserModalComponent;

  constructor(private userService: UserService, private store: Store<any>) {
    this.users = this.store.select('users').pipe(map(u => u.users));
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  createUser() {
    this.modal.open(new User(), a => this.store.dispatch(new usersActions.CreateUser(a)));
  }

  deleteUser(username: string) {
    this.store.dispatch(new usersActions.DeleteUser(username));
  }

  updateUser(user: User) {
    this.modal.open(user, a => this.store.dispatch(new usersActions.UpdateUser(a)));
  }

  enableUser(username: string) {
    this.store.dispatch(new usersActions.EnableUser(username));
  }

  disableUser(username: string) {
    this.store.dispatch(new usersActions.DisableUser(username));
  }

  refresh() {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.store.dispatch(new usersActions.FetchUsers(0, 100));
  }

}
