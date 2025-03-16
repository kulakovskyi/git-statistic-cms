import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { LayoutService } from '../../services';
import { MenuComponent } from '../menu/menu.component';
import { UnsubscribeBase } from '@core-utils';
import { MenuItem } from 'primeng/api';

const BLOCKED_SCROLL_CLASS = 'blocked-scroll';

@Component({
  selector: 'ui-layout',
  imports: [NgClass, MenuComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent extends UnsubscribeBase implements OnInit {
  @Input() model: MenuItem[] = [];
  constructor(
    public layoutService: LayoutService,
    public router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription = this.layoutService.overlayOpen$.subscribe(() => {
      if (this.layoutService.layoutState().staticMenuMobileActive) {
        this.toggleBodyScroll(true);
      }
    });

    this.addSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.hideMenu();
      });
  }

  hideMenu(): void {
    this.layoutService.layoutState.update((prev) => ({
      ...prev,
      overlayMenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
    }));
    this.toggleBodyScroll(false);
  }

  get containerClass(): { [key: string]: boolean | undefined } {
    return {
      'layout-overlay':
        this.layoutService.layoutConfig().menuMode === 'overlay',
      'layout-static': this.layoutService.layoutConfig().menuMode === 'static',
      'layout-static-inactive':
        this.layoutService.layoutState().staticMenuDesktopInactive &&
        this.layoutService.layoutConfig().menuMode === 'static',
      'layout-overlay-active':
        this.layoutService.layoutState().overlayMenuActive,
      'layout-mobile-active':
        this.layoutService.layoutState().staticMenuMobileActive,
    };
  }

  private toggleBodyScroll(block: boolean): void {
    if (document.body.classList) {
      if (block) {
        document.body.classList.add(BLOCKED_SCROLL_CLASS);
      } else {
        document.body.classList.remove(BLOCKED_SCROLL_CLASS);
      }
    } else {
      if (block) {
        document.body.className += ` ${BLOCKED_SCROLL_CLASS}`;
      } else {
        document.body.className = document.body.className
          .replace(BLOCKED_SCROLL_CLASS, '')
          .trim();
      }
    }
  }
}
