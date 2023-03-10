import { Route } from '@angular/router';
import { UsersComponent } from './users.component';
import { provideState } from '@ngrx/store';
import { userReducer } from './state/reducers/user.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './state/effects/user.effects'

export const UserRoute: Route[] = [
  {
    path: '',
    component: UsersComponent,
    providers: [
      provideState('users', userReducer),
      provideEffects([
        UserEffects,
      ]),
    ],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/users-view/users-view.component').then(c => c.UsersViewComponent),
      },
      {
        path: 'edit-user/:id',
        loadComponent: () => import('./pages/user-edit/user-edit.component').then(c => c.UserEditComponent),
      },
    ]
  }
]
