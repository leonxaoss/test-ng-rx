import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { userActions } from '../actions/user.action';
import { initialUserState } from '../states/user.state';


export const userFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialUserState,
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
        loaders: {
          ...state.loaders,
          userListLoader: false,
        },
      })),

    on(
      userActions.loadUsers,
      (state) => ({
        ...state,
        loaders: {
          ...state.loaders,
          userListLoader: true,
        },
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
        loaders: {
          ...state.loaders,
          userLoader: false,
        },
      })),

    on(
      userActions.loadUser,
      userActions.editUser,
      userActions.addUser,
      userActions.removeUser,
      (state) => ({
        ...state,
        loaders: {
          ...state.loaders,
          userLoader: true,
        },
      })),
  ),
  extraSelectors: ({ selectLoaders }) => ({
    selectUserLoader: createSelector(selectLoaders, selectLoaders => selectLoaders.userLoader),
    selectUserListLoader: createSelector(selectLoaders, selectLoaders => selectLoaders.userListLoader),
  }),
})


