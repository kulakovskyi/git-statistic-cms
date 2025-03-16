import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[coreGoBack]',
  standalone: true,
})
export class GoBackDirective {
  constructor(private location: Location) {}

  @HostListener('click')
  onClick(): void {
    this.location.back();
  }
}
