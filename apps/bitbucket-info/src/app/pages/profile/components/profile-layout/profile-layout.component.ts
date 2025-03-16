import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-profile-layout',
  standalone: false,
  templateUrl: './profile-layout.component.html',
  styleUrl: './profile-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileLayoutComponent {}
