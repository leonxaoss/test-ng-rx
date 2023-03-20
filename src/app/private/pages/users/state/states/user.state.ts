import { UserState } from '../../shared/interfaces/user-state.interface';
import { User } from '../../../../../shared/interfaces/user.interface';

export const initialUserState: UserState = {
  allUsers: [],
  user: {} as User,
  loaders: {
    userLoader: false,
    userListLoader: false,
  },
};
