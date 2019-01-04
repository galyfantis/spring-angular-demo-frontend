import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AuthGuard } from './_guards';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ArticlesComponent } from './articles';
import { CounterComponent } from './counter';


const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard] },
  { path: 'counter', component: CounterComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes);
