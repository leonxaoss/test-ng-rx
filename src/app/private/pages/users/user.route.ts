import { Route } from '@angular/router';
import { UsersComponent } from './users.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './state/effects/user.effects'
import { userFeature } from './state/reducers/user.reducer';

export const UserRoute: Route[] = [
  {
    path: '',
    component: UsersComponent,
    providers: [
      provideState(userFeature),
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
