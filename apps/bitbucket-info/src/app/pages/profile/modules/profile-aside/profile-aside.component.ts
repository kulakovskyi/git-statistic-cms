import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@ui-kit';
import { PAGE_ROUTES } from '@enums/page-routes.enum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-aside',
  imports: [ButtonComponent, RouterLink],
  templateUrl: './profile-aside.component.html',
  styleUrl: './profile-aside.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileAsideComponent {
  protected readonly PAGE_ROUTES = PAGE_ROUTES;
}
