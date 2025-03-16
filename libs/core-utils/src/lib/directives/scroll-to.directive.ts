import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { delay, distinct, filter, first, Subject, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UnsubscribeBase } from '../base';

@Directive({
  selector: '[coreScrollTo]',
  standalone: true,
})
export class ScrollToDirective
  extends UnsubscribeBase
  implements OnInit, AfterViewInit
{
  @Input() isScroll = false;
  @Input() delayMS = 0;
  private doScrollStream$ = new Subject();

  constructor(
    private el: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.addSubscription = this.route.queryParams
      .pipe(
        switchMap((params) => {
          this.isScroll = !!params['scroll'];
          return this.doScrollStream$.pipe(
            distinct(),
            filter(Boolean),
            delay(this.delayMS),
            first(),
          );
        }),
      )
      .subscribe(() => {
        this.directScroll();
        this.removeScrollQueryParam();
      });
  }

  ngAfterViewInit() {
    this.doScroll();
  }

  private directScroll() {
    this.el.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  private doScroll() {
    this.doScrollStream$.next(this.isScroll);
  }

  private removeScrollQueryParam() {
    const urlTree = this.router.parseUrl(this.router.url);
    if (urlTree.queryParams['scroll']) {
      delete urlTree.queryParams['scroll'];
      this.router
        .navigateByUrl(
          this.router.createUrlTree([], { queryParams: urlTree.queryParams }),
        )
        .then();
    }
  }
}
