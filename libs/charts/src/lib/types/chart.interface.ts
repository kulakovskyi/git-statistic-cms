import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';

export interface ChartSeriesInterface {
  name: string;
  data: number[];
}

export interface ChartPieInterface {
  series: number[];
  labels: string[];
}

export type ChartPieOptions = {
  chart?: ApexChart;
  responsive?: ApexResponsive[];
  labels?: string[];
  fill?: ApexFill;
  legend?: ApexLegend;
  dataLabels?: ApexDataLabels;
  plotOption: ApexPlotOptions;
  stroke?: ApexStroke;
  colors?: string[];
};

export type ChartSplineOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
  fill: ApexFill;
  grid: ApexGrid;
  tooltip: ApexTooltip;
};

export type ChartColumnOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
};
