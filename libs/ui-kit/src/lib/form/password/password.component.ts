import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { NgIf } from '@angular/common';
import { ValidationMessageComponent } from '../validation-message/validation-message.component';

@Component({
  selector: 'ui-password',
  imports: [
    PasswordModule,
    PaginatorModule,
    ReactiveFormsModule,
    NgIf,
    ValidationMessageComponent,
  ],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordComponent {
  label = input('');
  control = input<AbstractControl>();
  class = input('');
  feedback = input(false);
  skipValidation = input(false);
  description = input('');

  get formControl(): FormControl {
    return this.control() as FormControl;
  }
}
