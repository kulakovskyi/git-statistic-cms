import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class UnsubscribeBase implements OnDestroy {
  private subscriptions: Subscription[] = [];

  set addSubscription(subscription: Subscription | undefined) {
    if (subscription) {
      this.subscriptions.push(subscription);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
