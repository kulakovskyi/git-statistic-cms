import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartPieComponent } from '@charts';

@Component({
  selector: 'app-user-pie-statistic',
  imports: [ChartPieComponent],
  templateUrl: './user-pie-statistic.component.html',
  styleUrl: './user-pie-statistic.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPieStatisticComponent {}
