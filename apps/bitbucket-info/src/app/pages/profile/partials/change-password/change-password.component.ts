import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ButtonComponent, PasswordComponent } from '@ui-kit';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '@core-utils';

@Component({
  selector: 'app-change-password',
  imports: [PasswordComponent, ButtonComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  ngOnInit() {
    this.initializeForm();
  }

  changePassword() {
    if (this.form.invalid) return;
  }

  private initializeForm() {
    this.form = new FormGroup(
      {
        oldPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      { validators: passwordMatchValidator },
    );
  }
}
