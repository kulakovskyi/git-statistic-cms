import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AvatarComponent,
  ButtonComponent,
  InputComponent,
  LabelComponent,
} from '@ui-kit';
import { UploadImageService } from '@core-utils';

@Component({
  selector: 'app-user-form',
  imports: [AvatarComponent, LabelComponent, InputComponent, ButtonComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UploadImageService],
})
export class UserFormComponent {}
