import { UserState } from '../../shared/interfaces/user-state.interface';
import { createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.action';
import { User } from '../../../../../shared/interfaces/user.interface';

export const initialState: Partial<UserState> = {
  allUsers: [],
  user: {} as User,
  userLoader: false,
};


export const userReducer = createReducer(
  initialState,
  on(userActions.loadUsersSuccess, (state, action): Partial<UserState> => ({
    ...state,
    allUsers: action.users
  })),
  on(userActions.loadUserSuccess, (state, action): Partial<UserState> => ({
    ...state,
    user: action.user
  })),

  // user loader
  on(
      userActions.editUserSuccess,
      userActions.editUserFailure,
      userActions.addUserSuccess,
      userActions.addUserFailure,
      userActions.loadUsersSuccess,
      userActions.loadUsersFailure,
      userActions.removeUserSuccess,
      userActions.removeUserFailure,
    (state): Partial<UserState> => ({
      ...state,
      userLoader: false
    })),

  on(
      userActions.loadUsers,
      userActions.loadUser,
      userActions.editUser,
      userActions.addUser,
      userActions.removeUser,
    (state): Partial<UserState> => ({
      ...state,
      userLoader: true
    })),
);
