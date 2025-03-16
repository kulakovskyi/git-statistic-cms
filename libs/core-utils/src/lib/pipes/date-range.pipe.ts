import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRange',
  standalone: true,
})
export class DateRangePipe implements PipeTransform {
  transform(rangeDates: Date[]): { start: string; end: string } | null {
    if (rangeDates && rangeDates.length === 2) {
      const [start, end] = rangeDates;
      if (start && end) {
        return {
          start: start.toISOString(),
          end: end.toISOString(),
        };
      }
    }
    return null;
  }
}
