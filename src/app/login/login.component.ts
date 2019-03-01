import { OnInit, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { LoginUser, LogoutUser } from '../actions/user/user.actions';
import { Observable } from 'rxjs';
import { LoginState } from '../state/login/login.reducer';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  loading: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<any>
  ) {
    this.loading = store.select('login').pipe(map(l => l as LoginState), map(l => l && l.loading));
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.store.dispatch(new LogoutUser());
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.store.dispatch(new LoginUser(this.f.username.value, this.f.password.value, returnUrl));
  }

}
