import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserFormComponent } from '@pages/profile/modules/user-form/user-form.component';

@Component({
  selector: 'app-profile-main',
  imports: [UserFormComponent],
  templateUrl: './profile-main.component.html',
  styleUrl: './profile-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMainComponent {}
