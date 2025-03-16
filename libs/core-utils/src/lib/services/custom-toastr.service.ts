import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({ providedIn: 'root' })
export class CustomToastrService {
  constructor(
    private messageService: MessageService,
    public ref: DynamicDialogRef,
  ) {}

  success(message: string, ref?: DynamicDialogRef, isClose?: boolean) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
    if (isClose && ref) ref.close('success');
  }

  error(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
