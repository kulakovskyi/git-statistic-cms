import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { ValidationMessageComponent } from '../validation-message/validation-message.component';
import { DatePicker } from 'primeng/datepicker';
import { DATE_FORMAT_MIN } from '@core-utils';

@Component({
  selector: 'ui-calendar',
  imports: [
    CalendarModule,
    NgIf,
    ReactiveFormsModule,
    NgClass,
    FormsModule,
    ValidationMessageComponent,
    DatePicker,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  label = input('');
  showTime = input(false);
  icon = input('');
  type = input('text');
  control = input<AbstractControl>();
  class = input('');
  range = input(false);
  rangeDates = model<Date[]>([]);
  skipValidation = input(false);
  maxDate = input(
    new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
  );
  currentDate = model(new Date());
  dateChange = output<string>();
  dateRangeChange = output<Date[]>();

  get formControl(): FormControl {
    return this.control() as FormControl;
  }

  onDateChange(event: Date): void {
    this.dateChange.emit(event.toISOString());
  }

  onDateRangeChange() {
    this.dateRangeChange.emit(this.rangeDates());
  }

  protected readonly DATE_FORMAT_MIN = DATE_FORMAT_MIN;
}
