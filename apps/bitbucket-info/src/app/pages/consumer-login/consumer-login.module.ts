import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConsumerLoginLayoutComponent } from '@pages/consumer-login/components/consumer-login-layout.component';
import {
  ButtonComponent,
  CheckboxComponent,
  InputComponent,
  LabelComponent,
  PasswordComponent,
} from '@ui-kit';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ConsumerLoginLayoutComponent,
      },
    ]),
    LabelComponent,
    InputComponent,
    PasswordComponent,
    CheckboxComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  declarations: [ConsumerLoginLayoutComponent],
})
export class ConsumerLoginModule {}
