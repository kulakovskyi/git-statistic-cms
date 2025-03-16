import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LayoutService } from '../../theme-layout';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ui-switch-theme',
  imports: [NgClass],
  templateUrl: './switch-theme.component.html',
  styleUrl: './switch-theme.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchThemeComponent {
  constructor(protected layoutService: LayoutService) {}

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }
}
