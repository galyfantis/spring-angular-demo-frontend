import { OnInit, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, AlertService } from '../_services';
import { first, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as usersActions from '../actions/users/users.actions';
import { Observable } from 'rxjs';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loading: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>) {
      this.loading = this.store.select('register').pipe(map(a => a && a.loading));
    }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.store.dispatch(new usersActions.RegisterUser(this.registerForm.value));
  }
}
