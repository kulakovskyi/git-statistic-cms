import { Injectable, Type } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable()
export class ModalService {
  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService) {}

  openModal(component: Type<unknown>, data?: unknown) {
    this.ref = this.dialogService.open(component, {
      showHeader: false,
      width: '800px',
      modal: true,
      dismissableMask: true,
      breakpoints: {
        '960px': '500px',
        '640px': '90vw',
      },
      data: data,
    });

    return this.ref.onClose;
  }
}
