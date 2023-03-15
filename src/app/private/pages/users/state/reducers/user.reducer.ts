import { UserState } from '../../shared/interfaces/user-state.interface';
import { createFeature, createReducer, on } from '@ngrx/store';
import { userActions } from '../actions/user.action';
import { User } from '../../../../../shared/interfaces/user.interface';

export const initialState: UserState = {
  allUsers: [],
  user: {} as User,
  userLoader: false,
  userListLoader: false,
};

export const userFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    on(userActions.loadUsersSuccess, (state, action) => ({
      ...state,
      allUsers: action.users
    })),
    on(userActions.loadUserSuccess, (state, action) => ({
      ...state,
      user: action.user
    })),

    // user loader
    on(
      userActions.loadUsersSuccess,
      userActions.loadUsersFailure,
      (state) => ({
        ...state,
        userListLoader: false,
      })),

    on(
      userActions.loadUsers,
      (state) => ({
        ...state,
        userListLoader: true,
      })),

    on(
      userActions.loadUserSuccess,
      userActions.loadUserFailure,
      userActions.editUserSuccess,
      userActions.editUserFailure,
      userActions.addUserSuccess,
      userActions.addUserFailure,
      userActions.removeUserSuccess,
      userActions.removeUserFailure,
      (state) => ({
        ...state,
        userLoader: false,
      })),

    on(
      userActions.loadUser,
      userActions.editUser,
      userActions.addUser,
      userActions.removeUser,
      (state) => ({
        ...state,
        userLoader: true,
      })),
  )
})


