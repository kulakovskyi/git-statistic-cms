import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function dateObjectValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = control.value;
    const dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;

    if (typeof date === 'string' && dateRegex.test(date)) {
      const [year, month, day] = date.split('-').map(Number);
      const jsDate = new Date(Date.UTC(year, month - 1, day));
      if (
        jsDate.getUTCFullYear() === year &&
        jsDate.getUTCMonth() + 1 === month &&
        jsDate.getUTCDate() === day
      ) {
        return null;
      }
    }
    return { invalidDate: true };
  };
}

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentDate = new Date();
    currentDate.setSeconds(0, 0);

    const controlDate = new Date(control.value);
    controlDate.setSeconds(0, 0);

    return controlDate < currentDate ? { pastDate: true } : null;
  };
}

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const url = control.value;
    if (!url) {
      return null;
    }

    const urlPattern = /^https:\/\//i;
    const isValid = urlPattern.test(url);
    return isValid ? null : { invalidUrl: true };
  };
}

export function asanaUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const url = control.value;
    if (!url) {
      return null;
    }

    const urlPattern = /^https:\/\/app\.asana\.com.*/i;
    const isValid = urlPattern.test(url);
    return isValid ? null : { invalidAsanaUrl: true };
  };
}

export function figmaUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const url = control.value;
    if (!url) {
      return null;
    }

    const urlPattern = /^https:\/\/www\.figma\.com.*/i;
    const isValid = urlPattern.test(url);
    return isValid ? null : { invalidFigmaUrl: true };
  };
}

export function prodUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const url = control.value;
    if (!url) {
      return null;
    }

    const urlPattern = /^https:\/\/www\.favbet.*/i;
    const isValid = urlPattern.test(url);
    return isValid ? null : { invalidProdUrl: true };
  };
}

export function passwordMatchValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const form = control as FormGroup;
  const password = form.get('oldPassword')?.value;
  const confirmPasswordControl = form.get('newPassword');

  if (!confirmPasswordControl) return null;

  const errors = confirmPasswordControl.errors || {};
  if (password !== confirmPasswordControl.value) {
    errors['passwordMismatch'] = true;
    confirmPasswordControl.setErrors(errors);
    return { passwordMismatch: true };
  } else {
    delete errors['passwordMismatch'];
    confirmPasswordControl.setErrors(
      Object.keys(errors).length ? errors : null,
    );
    return null;
  }
}
