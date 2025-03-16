import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';
import { Button } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SeverityButtonType } from '../../types';

@Component({
  selector: 'ui-button',
  imports: [TooltipModule, Button],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  label = input('');
  class = input('');
  size = input<'large' | 'small'>();
  toolTip = input('');
  disabled = input(false);
  text = input(false);
  loading = input(false);
  rounded = input(false);
  icon = input('');
  type = input('');
  severity = input<SeverityButtonType>();

  @HostBinding('class.disabled') get isDisabled() {
    return this.disabled();
  }
}
