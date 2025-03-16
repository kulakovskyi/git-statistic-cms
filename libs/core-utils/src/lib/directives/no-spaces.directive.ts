import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[coreNoSpaces]',
  standalone: true,
})
export class NoSpacesDirective {
  @Input('coreNoSpaces') noSpaces = false;

  constructor(
    private ngControl: NgControl,
    private el: ElementRef,
  ) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    if (this.noSpaces) {
      const input = event.target as HTMLInputElement;
      const value = input.value.replace(/\s/g, '');
      if (this.ngControl && this.ngControl.control) {
        this.ngControl.control.setValue(value);
      } else {
        this.el.nativeElement.value = value;
      }
    }
  }
}
