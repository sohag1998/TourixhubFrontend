import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './shared/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { CommunityComponent } from './components/community/community.component';
import { MainComponent } from './components/layout/main/main.component';
import { ChatComponent } from './components/layout/chat/chat.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
    ],
  },
  {
    path: '',
    component: MainComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        component: HomeComponent,

      },
      {
        path: 'community',
        component: CommunityComponent,
      },
    ]
  },
  {
    path: 'inbox',
    component: ChatComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: '',

      }
    ]

  },
  { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
];
