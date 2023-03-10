import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../../shared/interfaces/user.interface';
import { Store } from '@ngrx/store';
import { addUser, editUser } from '../../state/actions/user.action';
import { Actions, ofType } from '@ngrx/effects';
import * as userActions from '../../state/actions/user.action';
import { LoaderComponent } from '../../../../../components/loader/loader.component';
import { selectLoader } from '../../state/selectors/user.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-add-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    LoaderComponent
  ],
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {

  form = this.fb.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })
  user: User = {} as User;
  isAdd = true;
  userLoader$: Observable<boolean> = this.store.select(selectLoader)

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<UserAddEditComponent>,
              private readonly store: Store,
              private action: Actions,
              @Inject(MAT_DIALOG_DATA) public data: { user: User }) {
  }

  ngOnInit() {
    this.isAdd = !this.data.user;
    if(this.data.user) {
      this.user = this.data.user;
      this.pathForm(this.user);
    }

    this.action.pipe(
      ofType(
        userActions.editUserSuccess,
        userActions.addUserSuccess,
      ),
    ).subscribe(() => {
      this.dialogRef.close()
    })
  }

  private pathForm(user: User): void {
    this.form.patchValue({
      name: user.name,
      username: user.username,
      password: user.password,
    })
  }

  public saveUser(): void {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const model = this.form.value as User;

    if(this.isAdd) {
      this.store.dispatch(addUser({user: model}));
    } else {
      this.store.dispatch(editUser({user: model, userId: this.user.id}))
    }
  }
}
