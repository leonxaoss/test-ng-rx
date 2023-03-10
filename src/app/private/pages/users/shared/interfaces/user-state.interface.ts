import { User } from '../../../../../shared/interfaces/user.interface';

export interface UserState {
  allUsers: User[];
  user: User;
  userLoader: boolean;
}
