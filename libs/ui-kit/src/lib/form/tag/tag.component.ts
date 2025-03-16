import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { SeverityTagType } from '../../types';

@Component({
  selector: 'ui-tag',
  imports: [ChipModule, TagModule, TooltipModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
  severity = input<SeverityTagType>('info');
  value = input('');
  tooltip = input('');
  rounded = input(false);
  icon = input('');
}
