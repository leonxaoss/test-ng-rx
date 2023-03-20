import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { userActions } from '../../state/actions/user.action';
import { Observable } from 'rxjs';
import { User } from '../../../../../shared/interfaces/user.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from '../../../../../components/loader/loader.component';
import { requestConformation } from '../../../../../store/actions/confirm';
import { userFeature } from '../../state/features/user.feature';

@Component({
  selector: 'app-users-view',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, LoaderComponent],
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit {

  users$: Observable<User[]> = this.store.select(userFeature.selectAllUsers);
  showLoader: Observable<boolean> = this.store.select(userFeature.selectUserListLoader);

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(userActions.loadUsers());
  }

  public addUser(): void {
    this.store.dispatch(userActions.openUserDialog({user: null}));
  }

  public editUser(user: User): void {
    this.store.dispatch(requestConformation({
      titles: {
        title: 'Do you want to edit this User',
        btnConfirm: 'Yes Edit'
      },
      confirm: userActions.openUserDialog({user: user
      })}));
  }

  public removeUser(id: number): void {
    this.store.dispatch(requestConformation({
      titles: {
        title: 'Do you want to remove this User',
        btnConfirm: 'Yes Delete'
      },
      confirm: userActions.removeUser({userId: id})
    }));
  }

}
