import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
} from '@angular/core';
import { ApexAxisChartSeries, NgApexchartsModule } from 'ng-apexcharts';
import { EN_MONTHS, EN_SHORT_MONTHS, EN_TOOLBAR } from '../../constants';
import { ChartSplineOptions } from '../../types';

@Component({
  selector: 'chart-spline',
  imports: [NgApexchartsModule],
  templateUrl: './chart-spline.component.html',
  styleUrl: './chart-spline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartSplineComponent implements OnInit {
  series = input<ApexAxisChartSeries>([]);
  categories = input<string[]>([]);
  toolbar = input<boolean>(true);
  chartOptions!: ChartSplineOptions;
  colors: string[] = [];

  ngOnInit() {
    this.initialChart();
  }

  initialChart() {
    this.chartOptions = {
      series: this.series(),
      chart: {
        type: 'area',
        height: 350,
        width: '100%',
        stacked: false,
        fontFamily: 'DMSans, sans-serif',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: this.toolbar(),
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
      fill: {
        type: 'image',
        opacity: 0.5,
        gradient: {
          shade: 'dark',
          type: 'vertical',
          shadeIntensity: 0,
          inverseColors: false,
          opacityFrom: 0.25,
          opacityTo: 0.25,
          stops: [100, 100],
        },
      },
      grid: {
        strokeDashArray: 5,
        borderColor: 'var(--text-color-secondary)',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        tooltip: {
          enabled: false,
        },
        labels: {
          style: {
            colors: 'var(--text-color)',
          },
        },
        ...(this.series().length > 1 && { categories: EN_SHORT_MONTHS }),
      },
      yaxis: {
        opposite: false,
        labels: {
          style: {
            colors: 'var(--text-color)',
          },
        },
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
        show: true,
        horizontalAlign: 'left',
        offsetY: 10,
        fontWeight: 500,
        labels: {
          colors: 'var(--text-color)',
        },
        itemMargin: {
          horizontal: 15,
        },
        markers: {
          strokeWidth: 8,
        },
      },
      title: {
        text: '',
        align: 'left',
      },
      labels: [],
      subtitle: {
        text: '',
        align: 'left',
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
