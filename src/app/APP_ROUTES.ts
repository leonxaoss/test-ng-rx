import { Route } from '@angular/router';
import { AuthGuard } from './providers/guards/auth/auth.guard';
import { PublicGuard } from './providers/guards/public/public.guard';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    loadChildren: () => import('./public/public.route').then(c => c.PublicRoute),
    canActivate: [PublicGuard]
  },
  {
    path: '',
    loadChildren: () => import('./private/private.route').then(c => c.PrivateRoute),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
]
