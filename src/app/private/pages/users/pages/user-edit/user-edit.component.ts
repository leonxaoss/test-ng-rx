import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { userActions } from '../../state/actions/user.action';
import { Observable } from 'rxjs';
import { User } from '../../../../../shared/interfaces/user.interface';
import { userFeature } from '../../state/features/user.feature';
import { LoaderComponent } from '../../../../../components/loader/loader.component';
import { selectRouteParam } from '../../../../../store/selectors/route.selectors';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user$: Observable<User> = this.store.select(userFeature.selectUser);
  userLoader$: Observable<boolean> = this.store.select(userFeature.selectUserLoader);

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    // this.store.select(selectRouteParam('id')).subscribe(res => {
    //   this.store.dispatch(userActions.loadUser({userId: Number(res) || 0}));
    // })
  }
}
