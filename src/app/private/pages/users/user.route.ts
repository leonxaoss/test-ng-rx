import { Route } from '@angular/router';
import { UsersComponent } from './users.component';

export const UserRoute: Route[] = [
  {
    path: '',
    component: UsersComponent,
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
