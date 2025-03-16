import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { SelectOptionInterface } from '../../types';
import { MultiSelectModule } from 'primeng/multiselect';
import { ValidationMessageComponent } from '../validation-message/validation-message.component';
import { Select } from 'primeng/select';

@Component({
  selector: 'ui-select',
  imports: [
    DropdownModule,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    CalendarModule,
    MultiSelectModule,
    ValidationMessageComponent,
    Select,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  label = input('');
  icon = input('');
  type = input('text');
  transparent = input(false);
  multiselect = input(false);
  control = input<AbstractControl>();
  class = input('');
  filter = input(false);
  selectedValue = input<unknown>('');
  disabled = input(false);
  skipValidation = input(false);
  modelInput = model();
  options = input<SelectOptionInterface[]>([
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'Paris', value: 'PRS' },
  ]);
  selectChange = output();

  get formControl(): FormControl {
    return this.control() as FormControl;
  }

  onChange(event: DropdownChangeEvent): void {
    this.selectChange.emit(event.value);
  }
}
