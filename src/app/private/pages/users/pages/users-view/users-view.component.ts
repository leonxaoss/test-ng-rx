import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectLoader, selectUsers } from '../../state/selectors/user.selectors';
import { loadUsers, openUserDialog, removeUser } from '../../state/actions/user.action';
import { Observable } from 'rxjs';
import { User } from '../../../../../shared/interfaces/user.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from '../../../../../components/loader/loader.component';

@Component({
  selector: 'app-users-view',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, LoaderComponent],
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit {

  users$: Observable<User[]> = this.store.select(selectUsers);
  showLoader: Observable<boolean> = this.store.select(selectLoader);

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

  public addEditUser(user: User | null): void {
    this.store.dispatch(openUserDialog({user}));
  }


  public removeUser(id: number): void {
    this.store.dispatch(removeUser({userId: id}));
  }

}
