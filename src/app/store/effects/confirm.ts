import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as confirmActions from '../actions/confirm';
import { tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { inject } from '@angular/core';

export const requestConformation = createEffect(
  (
      actions = inject(Actions),
      dialog = inject(MatDialog)
    ) => actions.pipe(
      ofType(
        confirmActions.requestConformation,
      ),
      tap(action => {
        dialog.open(ConfirmComponent, {
          data: {
            titles: action.titles,
            confirm: action.confirm,
            reject: action.reject
          }
        })
      })
    ),
  {
    functional: true,
    dispatch: false
  }
)

