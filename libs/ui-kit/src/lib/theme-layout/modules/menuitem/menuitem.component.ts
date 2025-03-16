import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  HostBinding,
} from '@angular/core';
import { LayoutService } from '../../services';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { childrenAnimation } from '../../../animations';
import { UnsubscribeBase } from '@core-utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[ui-menuitem]',
  imports: [NgIf, NgClass, RouterLink, RouterLinkActive, Ripple, NgForOf],
  templateUrl: './menuitem.component.html',
  styleUrl: './menuitem.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [childrenAnimation],
  providers: [LayoutService],
})
export class MenuitemComponent extends UnsubscribeBase implements OnInit {
  @Input() index!: number;
  @Input() item!: MenuItem;
  @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;
  @Input() parentKey!: string;
  active = false;
  key = '';

  constructor(
    public router: Router,
    private layoutService: LayoutService,
  ) {
    super();
  }

  ngOnInit() {
    this.key = this.parentKey
      ? `${this.parentKey}-${this.index}`
      : `${this.index}`;

    this.addSubscription = this.layoutService.menuSource$.subscribe((value) => {
      Promise.resolve().then(() => {
        this.active = value.routeEvent
          ? value.key === this.key || value.key.startsWith(`${this.key}-`)
          : !(value.key !== this.key && !value.key.startsWith(`${this.key}-`));
      });
    });

    this.addSubscription = this.layoutService.resetSource$.subscribe(() => {
      this.active = false;
    });

    this.addSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.item.routerLink) {
          this.updateActiveStateFromRoute();
        }
      });

    if (this.item.routerLink) {
      this.updateActiveStateFromRoute();
    }
  }

  itemClick(event: Event) {
    if (this.item.disabled) {
      event.preventDefault();
      return;
    }

    if (this.item.command) {
      this.item.command({ originalEvent: event, item: this.item });
    }

    if (this.item.items) {
      this.active = !this.active;
    }
  }

  get submenuAnimation() {
    return this.root ? 'expanded' : this.active ? 'expanded' : 'collapsed';
  }

  @HostBinding('class.active-menuitem')
  get activeClass() {
    return this.active && !this.root;
  }

  private updateActiveStateFromRoute() {
    const activeRoute = this.router.isActive(this.item.routerLink[0], {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored',
    });

    if (activeRoute) {
      this.layoutService.onMenuStateChange({ key: this.key, routeEvent: true });
    }
  }
}
