import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ChartSeriesInterface, ChartSplineComponent } from '@charts';

@Component({
  selector: 'app-user-statistic',
  imports: [ChartSplineComponent],
  templateUrl: './user-statistic.component.html',
  styleUrl: './user-statistic.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserStatisticComponent {
  statTestView = signal<ChartSeriesInterface[]>([
    {
      name: 'Dima',
      data: [10, 15, 25, 35, 45, 55, 65],
    },
    {
      name: 'Dana',
      data: [20, 30, 40, 50, 60, 70, 80],
    },
    {
      name: 'Andrew',
      data: [5, 10, 15, 20, 25, 30, 35],
    },
    {
      name: 'Karina',
      data: [12, 22, 32, 42, 52, 62, 72],
    },
  ]);
}
