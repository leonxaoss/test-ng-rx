import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadUser } from '../../state/actions/user.action';
import { ActivatedRoute } from '@angular/router';
import { selectUser } from '../../state/selectors/user.selectors';
import { Observable } from 'rxjs';
import { User } from '../../../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user$: Observable<User> = this.store.select(selectUser);

  constructor(private readonly store: Store, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.store.select(selectRouteParam).subscribe(res => {
    //   console.log(res);
    // })
    this.activeRoute.params.subscribe(res => {
      this.store.dispatch(loadUser({userId: res['id']}));
    })
  }
}
