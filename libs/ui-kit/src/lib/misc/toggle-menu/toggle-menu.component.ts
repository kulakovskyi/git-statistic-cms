import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LayoutService } from '../../theme-layout';

@Component({
  selector: 'ui-toggle-menu',
  imports: [],
  templateUrl: './toggle-menu.component.html',
  styleUrl: './toggle-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleMenuComponent {
  constructor(protected layoutService: LayoutService) {}
}
