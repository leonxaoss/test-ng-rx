import { userActions } from '../actions/user.action';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../providers/services/user/user.service';
import { catchError, filter, map, mergeMap, of, tap } from 'rxjs';
import { User } from '../../../../../shared/interfaces/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAddEditComponent } from '../../components/user-add-edit/user-add-edit.component';
import { routerNavigationAction } from '@ngrx/router-store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectRouteParam } from '../../../../../store/selectors/route.selectors';
import { Store } from '@ngrx/store';

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
          map((res: User) => userActions.loadUserSuccess({user: res})),
          catchError((error: HttpErrorResponse) => of(userActions.loadUserFailure(error)))
        )
      )
    )
  });

  loadUserFromEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        routerNavigationAction,
      ),
      filter(({ payload }) => payload.routerState.url.includes('edit-user')),
      concatLatestFrom(() => this.store.select(selectRouteParam('id'))),
      map(res => Number(res[1])),
      mergeMap((id) => {
        return this.userService.getUser(id || 0)
        .pipe(
          map((res: User) => userActions.loadUserSuccess({user: res})),
          catchError((error: HttpErrorResponse) => of(userActions.loadUserFailure(error)))
        )}
      )
    )
  });

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
            return userActions.editUserSuccess({user: res, message: 'User has edited'})
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
            return userActions.removeUserSuccess({user: res, message: 'User has removed'})
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

  handleSuccessMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          userActions.editUserSuccess,
          userActions.removeUserSuccess
        ),
        tap((action) => {
          if(action.message) {
            this.snackBar.open(action.message, 'Ok', { duration: 2000 })
          }
        })
      ),
    { dispatch: false }
  );


  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService,
    public dialog: MatDialog,
    private store: Store,
    private readonly snackBar: MatSnackBar,
  ) {}

}
