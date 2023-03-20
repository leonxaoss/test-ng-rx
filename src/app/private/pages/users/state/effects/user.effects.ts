import { userActions } from '../actions/user.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../providers/services/user/user.service';
import { catchError, filter, map, mergeMap, of, tap } from 'rxjs';
import { User } from '../../../../../shared/interfaces/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAddEditComponent } from '../../components/user-add-edit/user-add-edit.component';
import { routerNavigationAction } from '@ngrx/router-store';

@Injectable()

export class UserEffects {

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        userActions.loadUsers,
        userActions.addUserSuccess,
        userActions.editUserSuccess,
        userActions.removeUserSuccess,
      ),
      mergeMap(() => this.userService.getUsers()
        .pipe(
          map((res: User[]) => userActions.loadUsersSuccess({users: res})),
          catchError((error: HttpErrorResponse) => of(userActions.loadUsersFailure(error)))
        )
      )
    )
  });

  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        userActions.loadUser,
      ),
      mergeMap((action) => this.userService.getUser(action.userId)
        .pipe(
          map((res: User) => {
            return userActions.loadUserSuccess({user: res})
          }),
          catchError((error: HttpErrorResponse) => of(userActions.loadUserFailure(error)))
        )
      )
    )
  });

  // loadUser2$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(
  //       routerNavigationAction,
  //     ),
  //     filter(({ payload }) => payload.routerState.url.includes('edit-user')),
  //     tap(({ payload }) => {
  //
  //       console.log(payload)
  //       console.log(payload.routerState.root.paramMap);
  //     }),
  //     // mergeMap(({ payload }) => {
  //     //   const id = Number(payload.event.state.root.paramMap.get('id')) || 0;
  //     //   return this.userService.getUser(id)
  //     //   .pipe(
  //     //     map((res: User) => {
  //     //       return userActions.loadUserSuccess({user: res})
  //     //     }),
  //     //     catchError((error: HttpErrorResponse) => of(userActions.loadUserFailure(error)))
  //     //   )}
  //     // )
  //   )
  // }, {
  //   dispatch: false
  // });

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        userActions.addUser,
      ),
      mergeMap((action) => this.userService.addUser(action.user)
        .pipe(
          map((res: User) => {
            return userActions.addUserSuccess({user: res})
          }),
          catchError((error: HttpErrorResponse) => of(userActions.addUserFailure(error)))
        )
      )
    )
  });

  editUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        userActions.editUser,
      ),
      mergeMap((action) => this.userService.editUser(action.user, action.userId)
        .pipe(
          map((res: User) => {
            return userActions.editUserSuccess({user: res})
          }),
          catchError((error: HttpErrorResponse) => of(userActions.editUserFailure(error)))
        )
      )
    )
  });

  removeUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        userActions.removeUser,
      ),
      mergeMap((action) => this.userService.deleteUser(action.userId)
        .pipe(
          map((res: User) => {
            return userActions.removeUserSuccess({user: res})
          }),
          catchError((error: HttpErrorResponse) => of(userActions.removeUserFailure(error)))
        )
      )
    )
  });

  openUserDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        userActions.openUserDialog,
      ),
      tap(action => {
        this.dialog.open(UserAddEditComponent, {
          data: {
            user: action.user
          }
        })
      })
    )
  }, {
    dispatch: false,
  })


  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService,
    public dialog: MatDialog,
  ) {}

}
