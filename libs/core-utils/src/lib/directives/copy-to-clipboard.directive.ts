import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[coreCopyToClipboard]',
  standalone: true,
})
export class CopyToClipboardDirective {
  @Input('coreCopyToClipboard') textToCopy = '';

  private readonly TOOLTIP_DISPLAY_DURATION = 1500;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  @HostListener('click')
  copyText() {
    if (this.textToCopy) {
      navigator.clipboard.writeText(this.textToCopy).then();
    }
  }
}
