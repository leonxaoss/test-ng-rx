import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../../shared/interfaces/user-state.interface';


const selectFeature = createFeatureSelector<UserState>('users');

export const selectUsers = createSelector(
  selectFeature,
  (state: UserState) => state.allUsers
);

export const selectUser = createSelector(
  selectFeature,
  (state: UserState) => state.user
);

export const selectLoader = createSelector(
  selectFeature,
  (state: UserState) => state.userLoader
);
