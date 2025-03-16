import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'ui-skeleton-table',
  imports: [SkeletonModule, NgForOf],
  templateUrl: './skeleton-table.component.html',
  styleUrl: './skeleton-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonTableComponent {
  rows = input<number>(10);

  get rowsArray(): number[] {
    return Array(this.rows()).fill(0);
  }
}
