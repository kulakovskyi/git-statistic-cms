import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { NgIf } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'ui-checkbox',
  imports: [NgIf, CheckboxModule, ReactiveFormsModule, FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  label = input('');
  icon = input('');
  type = input('text');
  transparent = input(false);
  control = input<AbstractControl>();
  class = input('');
  name = input('');
  disabled = input(false);
  modelInput = model();
  selectChange = output<boolean>();

  get formControl(): FormControl {
    return this.control() as FormControl;
  }

  selectChangeCheckbox(event: CheckboxChangeEvent) {
    this.selectChange.emit(event.checked);
  }
}
