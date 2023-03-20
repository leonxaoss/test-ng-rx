import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/APP_ROUTES';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import * as ConfirmEffects from './app/store/effects/confirm';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(),
    provideStore(),
    provideRouterStore(),
    provideAnimations(),
    importProvidersFrom(MatDialogModule),
    provideState('router', routerReducer),
    provideStoreDevtools({
      maxAge: 25,
    }),
    provideEffects(ConfirmEffects)
  ],
})
  .catch(err => console.error(err));
