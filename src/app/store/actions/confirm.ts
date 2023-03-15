import { createAction, props } from '@ngrx/store';
import { ConfirmInterface } from '../../shared/interfaces/confirm.interface';

export const requestConformation = createAction(
  '[Conformation] Request Conformation',
  props<ConfirmInterface>(),
)
