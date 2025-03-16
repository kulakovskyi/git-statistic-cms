import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { SelectOptionInterface } from '../../types';

@Component({
  selector: 'ui-auto-complete',
  imports: [AutoCompleteModule],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCompleteComponent {
  filteredCountries: SelectOptionInterface[] = [];
  icon = input<string>('pi-search');
  list = input<SelectOptionInterface[]>([]);
  selectedItem = output<SelectOptionInterface>();

  filterCountry(event: AutoCompleteCompleteEvent) {
    const filtered: SelectOptionInterface[] = [];
    const query = event.query;

    for (let i = 0; i < this.list().length; i++) {
      const item = this.list()[i];
      if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }

    this.filteredCountries = filtered;
  }
}
