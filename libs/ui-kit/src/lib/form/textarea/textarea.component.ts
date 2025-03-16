import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { ValidationMessageComponent } from '../validation-message/validation-message.component';
import { Textarea } from 'primeng/textarea';

@Component({
  selector: 'ui-textarea',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgClass,
    ValidationMessageComponent,
    Textarea,
  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  label = input('');
  type = input('text');
  control = input<AbstractControl>();
  class = input('');
  skipValidation = input(false);

  get formControl(): FormControl {
    return this.control() as FormControl;
  }
}
