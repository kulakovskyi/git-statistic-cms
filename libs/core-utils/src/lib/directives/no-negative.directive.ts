import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[corePositiveNumbers]',
  standalone: true,
})
export class PositiveNumbersDirective {
  @Input('corePositiveNumbers') isEnabled = true;

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.isEnabled) {
      const allowedKeys = [
        'Backspace',
        'Tab',
        'ArrowLeft',
        'ArrowRight',
        'Delete',
        'Enter',
      ];
      const isNumberKey = event.key >= '0' && event.key <= '9';
      const isAllowedKey = allowedKeys.includes(event.key);

      if (!isNumberKey && !isAllowedKey) {
        event.preventDefault();
      }
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    if (this.isEnabled) {
      const clipboardData = event.clipboardData;
      const pastedText = clipboardData?.getData('text') || '';
      if (pastedText.includes('-')) {
        event.preventDefault();
      }
    }
  }
}
