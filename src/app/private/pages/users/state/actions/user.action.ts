import { createAction, props } from '@ngrx/store';
import { User } from '../../../../../shared/interfaces/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const loadUsers = createAction('[User] Load Users');

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{users: User[]}>(),
)

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: HttpErrorResponse }>(),
)

export const loadUser = createAction(
  '[User] Load User',
  props<{userId: number}>(),
)

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{user: User}>(),
)

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: HttpErrorResponse }>(),
)

export const openUserDialog = createAction(
  '[User] Open User Dialog',
  props<{user: User | null}>(),
)

export const addUser = createAction(
  '[User] Add User',
  props<{user: User}>(),
)

export const addUserSuccess = createAction(
  '[User] Add User Success',
  props<{user: User}>(),
)

export const addUserFailure = createAction(
  '[User] Add User Failure',
  props<{ error: HttpErrorResponse }>(),
)

export const editUser = createAction(
  '[User] Edit User',
  props<{user: User, userId: number}>(),
)

export const editUserSuccess = createAction(
  '[User] Edit User Success',
  props<{user: User}>(),
)

export const editUserFailure = createAction(
  '[User] Edit User Failure',
  props<{ error: HttpErrorResponse }>(),
)

export const removeUser = createAction(
  '[User] Remove User',
  props<{userId: number}>(),
)

export const removeUserSuccess = createAction(
  '[User] Remove User Success',
  props<{user: User}>(),
)

export const removeUserFailure = createAction(
  '[User] Remove User Failure',
  props<{ error: HttpErrorResponse }>(),
)
