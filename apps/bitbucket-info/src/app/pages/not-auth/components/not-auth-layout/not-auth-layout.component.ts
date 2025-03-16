import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-not-auth-layout',
  standalone: false,
  templateUrl: './not-auth-layout.component.html',
  styleUrl: './not-auth-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotAuthLayoutComponent {}
