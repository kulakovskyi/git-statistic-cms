import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ui-link',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  icon = input<string>('');
  text = input<string>('');
  routerLink = input<string>('');
  class = input<string>('');
}
