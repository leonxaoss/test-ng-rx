import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../../../shared/interfaces/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const userActions = createActionGroup({
  source: '[User]',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{users: User[]}>(),
    'Load Users Failure': props<{ error: HttpErrorResponse }>(),
    'Load User':  props<{userId: number}>(),
    'Load User Success': props<{user: User}>(),
    'Load User Failure': props<{ error: HttpErrorResponse }>(),
    'Open User Dialog':  props<{user: User | null}>(),
    'Add User': props<{user: User}>(),
    'Add User Success': props<{user: User}>(),
    'Add User Failure':  props<{ error: HttpErrorResponse }>(),
    'Edit User': props<{user: User, userId: number}>(),
    'Edit User Success': props<{user: User}>(),
    'Edit User Failure':  props<{ error: HttpErrorResponse }>(),
    'Remove User':  props<{userId: number}>(),
    'Remove User Success':  props<{user: User}>(),
    'Remove User Failure': props<{ error: HttpErrorResponse }>(),
  }
})
