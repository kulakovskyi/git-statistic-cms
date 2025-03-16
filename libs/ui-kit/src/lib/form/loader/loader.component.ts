import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'ui-loader',
  imports: [ProgressSpinnerModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  strokeWidth = input<string>('4');
  fill = input<string>('var(--surface-ground)');
  animationDuration = input<string>('.5s');
  width = input<string>('50px');
  height = input<string>('50px');
}
