import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { Ripple } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Popover } from 'primeng/popover';

@Component({
  selector: 'ui-popover',
  imports: [
    StyleClassModule,
    Ripple,
    InputGroupModule,
    InputGroupAddonModule,
    Popover,
  ],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent {
  @ViewChild('op') overlayPanel!: Popover;

  hide() {
    this.overlayPanel.hide();
  }
}
