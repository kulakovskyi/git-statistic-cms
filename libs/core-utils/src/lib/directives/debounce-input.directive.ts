import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[coreDebounceInput]',
  standalone: true,
})
export class DebounceInputDirective implements OnDestroy {
  @Input() debounceTime = 1000;
  @Output() debounceInput = new EventEmitter<Event>();

  private timeout: ReturnType<typeof setTimeout> | null = null;

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.debounceInput.emit(event);
    }, this.debounceTime);
  }

  ngOnDestroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}
