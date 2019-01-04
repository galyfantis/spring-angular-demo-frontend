import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserService } from './_services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing } from './app.routing';
import { AlertComponent } from './_directives';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { AlertService, AuthenticationService, ArticleService } from './_services';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './_helpers';
import { ArticlesComponent } from './articles';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './state/counter/counter.reducer';
import { CounterComponent } from './counter';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from './state/counter/counter.effects';
import { UserEffects } from './state/user/user.effects';
import { userReducer } from './state/user/user.reducer';
import { loginReducer } from './state/login/login.reducer';
import { LoginEffects } from './state/login/login.effects';
import { articleReducer } from './state/article/article.reducer';
import { ArticleEffects } from './state/article/article.effects';
import { NgbdArticleModalComponent } from './articles/article-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component';
import { usersReducer } from './state/users/users.reducer';
import { UsersEffects } from './state/users/users.effects';
import { NgbdUserModalComponent } from './home/user-modal';
import { registerReducer } from './state/register/register.reducer';
import { RegisterEffects } from './state/register/register.effects';

@NgModule({
  imports: [
        BrowserModule,
        StoreModule.forRoot({counter: counterReducer, user: userReducer, login: loginReducer,
          register: registerReducer,
          article: articleReducer, users: usersReducer}),
        EffectsModule.forRoot([CounterEffects, UserEffects, LoginEffects, RegisterEffects, ArticleEffects, UsersEffects]),
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        NgbModule.forRoot(),
        FormsModule
  ],
  declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ArticlesComponent,
        CounterComponent,
        NgbdArticleModalComponent,
        NgbdUserModalComponent,
        MenuComponent
  ],
  providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        ArticleService,

        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

        fakeBackendProvider
  ],
  // entryComponents: [
  //   NgbdArticleModalComponent
  // ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
