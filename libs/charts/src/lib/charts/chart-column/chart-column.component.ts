import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
} from '@angular/core';
import { NgApexchartsModule, ApexAxisChartSeries } from 'ng-apexcharts';
import { EN_MONTHS, EN_SHORT_MONTHS, EN_TOOLBAR } from '../../constants';
import { ChartColumnOptions } from '../../types';

@Component({
  selector: 'chart-column',
  imports: [NgApexchartsModule],
  templateUrl: './chart-column.component.html',
  styleUrl: './chart-column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartColumnComponent implements OnInit {
  series = input<ApexAxisChartSeries>([]);
  categories = input<string[]>([]);
  chartOptions!: ChartColumnOptions;
  colors: string[] = [];

  ngOnInit() {
    this.initialChart();
  }

  initialChart() {
    this.chartOptions = {
      series: this.series(),
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'DMSans, sans-serif',
        toolbar: {
          show: true,
        },
        defaultLocale: 'en',
        locales: [
          {
            name: 'en',
            options: {
              months: EN_MONTHS,
              shortMonths: EN_SHORT_MONTHS,
              toolbar: EN_TOOLBAR,
            },
          },
        ],
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4,
          borderRadiusApplication: 'end',
        },
      },

      grid: {
        strokeDashArray: 5,
        borderColor: 'var(--surface-500)',
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        labels: {
          style: {
            colors: 'var(--surface-800)',
          },
        },
        ...(this.series().length > 1 && { categories: EN_SHORT_MONTHS }),
      },
      yaxis: {
        opposite: false,
        labels: {
          style: {
            colors: 'var(--surface-800)',
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        x: {
          show: false,
          formatter: function (val, opts) {
            return EN_MONTHS[opts.dataPointIndex];
          },
        },
        y: {
          formatter: function (val) {
            return Math.round(val).toString();
          },
        },
      },
      legend: {
        horizontalAlign: 'left',
        offsetY: 10,
        fontWeight: 500,
        labels: {
          colors: 'var(--surface-500)',
        },
        itemMargin: {
          horizontal: 15,
        },
        markers: {
          strokeWidth: 8,
        },
      },
    };

    this.colors = [
      'var(--p-teal-500)',
      'var(--p-cyan-500)',
      'var(--p-purple-500)',
      'var(--p-rose-500)',
      'var(--p-green-500)',
      'var(--p-red-500)',
      'var(--p-yellow-500)',
    ];
  }
}
