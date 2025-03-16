import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { map, Observable, startWith, Subscription } from 'rxjs';

@Component({
  selector: 'ui-validation-message',
  imports: [NgIf, AsyncPipe],
  templateUrl: './validation-message.component.html',
  styleUrl: './validation-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationMessageComponent implements OnChanges, OnDestroy {
  @Input() control!: AbstractControl;
  @Input() showImmediately = false;
  statusChangesSub$: Subscription = new Subscription();
  errorMessageKey = '';
  errorMessageParams: { [key: string]: string } = {};
  statusChanges$!: Observable<boolean>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['control']) {
      this.statusChanges$ = this.control.statusChanges.pipe(
        startWith(this.control.status),
        map(() => this.updateErrorMessage()),
      );
      this.statusChangesSub$ = this.statusChanges$.subscribe();
    }
  }

  ngOnDestroy() {
    this.statusChangesSub$.unsubscribe();
  }

  updateErrorMessage(): boolean {
    const errors = this.control.errors;
    if (errors) {
      const errorKey = Object.keys(errors)[0];
      switch (errorKey) {
        case 'required':
          this.errorMessageKey = 'This field is required';
          break;
        case 'email':
          this.errorMessageKey = 'Invalid email';
          break;
        case 'minlength':
          this.errorMessageKey = `Min length - ${errors['minlength'].requiredLength}`;

          break;
        case 'maxlength':
          this.errorMessageKey = `Max length - ${errors['maxlength'].requiredLength}`;

          break;
        case 'passwordMismatch':
          this.errorMessageKey = 'Passwords do not match';
          break;
        case 'invalidDate':
          this.errorMessageKey = 'Invalid date';
          break;
        case 'invalidUrl':
          this.errorMessageKey = 'Invalid URL';
          break;
        case 'invalidProdUrl':
          this.errorMessageKey = 'Invalid Prod URL';
          break;
        case 'invalidFigmaUrl':
          this.errorMessageKey = 'Invalid Figma URL';
          break;
        case 'invalidAsanaUrl':
          this.errorMessageKey = 'Invalid Asana URL';
          break;
        case 'invalidCodeFormat':
          this.errorMessageKey = 'Invalid code format';
          break;
        case 'pastDate':
          this.errorMessageKey = 'Past date';
          break;
        default:
          this.errorMessageKey = '';
          this.errorMessageParams = {};
      }
    } else {
      this.errorMessageKey = '';
      this.errorMessageParams = {};
    }
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }
}
