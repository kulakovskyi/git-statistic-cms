import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ChipModule } from 'primeng/chip';
@Component({
  selector: 'ui-chip',
  imports: [ChipModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
  label = input('');
  icon = input('');
  class = input('bg-primary');
  removable = input(false);
  remove = output<MouseEvent>();
}
