import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>('/api/users');
  }

  getByUsername(username: string) {
    return this.http.get<User>('/api/users/' + username);
  }

  getCurrentUser() {
    return this.http.get<User>('/api/auth');
  }

  create(user: User) {
    return this.http.post('/api/users', user);
  }

  update(user: User) {
    return this.http.put('/api/users', user);
  }

  delete(username: string) {
    return this.http.delete('/api/users/' + username);
  }

  enable(username: string) {
    return this.http.post('/api/users/' + username + '/enable', {});
  }

  disable(username: string) {
    return this.http.post('/api/users/' + username + '/disable', {});
  }

  register(user: User) {
    return this.http.post('/api/users/register', user);
  }

}
