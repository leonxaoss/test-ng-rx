import { Route } from '@angular/router';
import { PublicComponent } from './public.component';

export const PublicRoute: Route[] = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login'
      },
    ]
  }
]
