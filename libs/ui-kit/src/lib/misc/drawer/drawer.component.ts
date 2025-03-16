import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { Drawer } from 'primeng/drawer';

@Component({
  selector: 'ui-drawer',
  imports: [Drawer],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent {
  visible = model<boolean>(false);
  position = input('left');
}
