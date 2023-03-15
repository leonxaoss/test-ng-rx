import { Action } from '@ngrx/store';

export interface ConfirmInterface {
  titles: {
    title: string,
    btnConfirm?: string
    btnReject?: string
  },
  confirm: Action,
  reject?: Action,
}
