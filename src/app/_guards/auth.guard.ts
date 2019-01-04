import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, first, switchMap } from 'rxjs/operators';
import { User } from '../_models';
import { Observable, of } from 'rxjs';
import { LoginSuccess } from '../actions/user/user.actions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<any>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('currentUserToken')) {
      return true;
    }
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

}
