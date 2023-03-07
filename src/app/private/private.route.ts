import { Route } from '@angular/router';
import { PrivateComponent } from './private.component';

export const PrivateRoute: Route[] = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent),
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/user.route').then(m => m.UserRoute),
      }
    ]
  }
]
