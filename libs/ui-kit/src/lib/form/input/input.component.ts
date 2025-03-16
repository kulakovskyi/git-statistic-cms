import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { NgClass, NgIf } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ValidationMessageComponent } from '../validation-message/validation-message.component';
import { NoSpacesDirective, PositiveNumbersDirective } from '@core-utils';

@Component({
  selector: 'ui-input',
  imports: [
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    NgClass,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    PositiveNumbersDirective,
    NoSpacesDirective,
    ValidationMessageComponent,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  label = input('');
  icon = input('');
  noNegative = input(false);
  noSpaces = input(false);
  type = input('text');
  control = input<AbstractControl>();
  skipValidation = input(false);
  class = input('');
  disabled = input(false);
  size = input<'large' | 'small'>('large');
  modelInput = model();

  get formControl(): FormControl {
    return this.control() as FormControl;
  }
}
