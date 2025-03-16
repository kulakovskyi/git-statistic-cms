import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'ui-pagination',
  imports: [PaginatorModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  first = input<number>(0);
  rows = input<number>(0);
  totalRecords = input<number>(0);
  rowsPerPageOptions = input<number[]>([10, 20, 30]);
  paginatorChange = output<PaginatorState>();

  onPageChange($event: PaginatorState) {
    this.paginatorChange.emit($event);
  }
}
