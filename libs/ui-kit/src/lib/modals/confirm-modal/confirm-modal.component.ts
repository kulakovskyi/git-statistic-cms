import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MODAL_CALLBACK } from '@core-utils';
import { ButtonComponent } from '../../form';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ui-confirm-modal',
  imports: [ButtonComponent, NgClass],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModalComponent {
  description: string;
  header: string;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
    this.description = this.config.data.description;
    this.header = this.config.data.header;
  }

  closeModal() {
    this.ref.close();
  }

  submit() {
    this.ref.close(MODAL_CALLBACK.SUCCESS);
  }
}
