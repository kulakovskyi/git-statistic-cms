import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
} from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartPieInterface, ChartPieOptions } from '../../types';

@Component({
  selector: 'chart-pie',
  imports: [NgApexchartsModule],
  templateUrl: './chart-pie.component.html',
  styleUrl: './chart-pie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartPieComponent implements OnInit {
  pieData = input.required<ChartPieInterface>();
  categories = input<string[]>([]);
  toolbar = input<boolean>(true);
  chartOptions!: ChartPieOptions;
  colors: string[] = [];

  ngOnInit() {
    this.initialChart();
  }

  initialChart() {
    this.chartOptions = {
      chart: {
        width: '100%',
        type: 'donut',
        fontFamily: 'DMSans, sans-serif',
      },
      colors: [
        'var(--p-teal-500)',
        'var(--p-cyan-500)',
        'var(--p-purple-500)',
        'var(--p-rose-500)',
        'var(--p-green-500)',
        'var(--p-red-500)',
        'var(--p-yellow-500)',
      ],
      dataLabels: {
        enabled: false,
      },
      plotOption: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                fontFamily: 'DMSans, sans-serif',
                fontWeight: 500,
              },
              value: {
                fontFamily: 'DMSans, sans-serif',
                fontWeight: 500,
                // color: 'var(--color-gray-pies)',
              },
            },
          },
        },
      },

      stroke: {
        curve: 'straight',
        colors: ['var(--text-color)'],
        lineCap: 'round',
      },
      legend: {
        show: true,
        position: 'bottom',
        fontFamily: 'DMSans, sans-serif',
        fontWeight: 500,
        fontSize: '14px',
        horizontalAlign: 'center',
        labels: {
          colors: 'var(--text-color)',
        },
        itemMargin: {
          horizontal: 5,
          vertical: 10,
        },
        markers: {
          strokeWidth: 8,
        },
      },
    };
  }
}
