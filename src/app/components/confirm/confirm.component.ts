import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { ConfirmInterface } from '../../shared/interfaces/confirm.interface';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  constructor( public dialogRef: MatDialogRef<ConfirmComponent>,
               private store: Store,
               @Inject(MAT_DIALOG_DATA) public data: ConfirmInterface) {
  }

  public accept(): void {
    this.store.dispatch(this.data.confirm);
    this.dialogRef.close();
  }

  public reject(): void {
    if(this.data?.reject) {
      this.store.dispatch(this.data.reject);
    }
    this.dialogRef.close();
  }
}
