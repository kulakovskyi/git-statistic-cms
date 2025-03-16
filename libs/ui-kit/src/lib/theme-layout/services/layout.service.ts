import { Injectable, effect, signal, computed } from '@angular/core';
import { Subject } from 'rxjs';
import { layoutConfig, LayoutState, MenuChangeEvent } from '../../types';
import { updatePreset } from '@primeng/themes';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly LOCAL_STORAGE_KEY = 'layoutConfig';
  private configUpdate = new Subject<layoutConfig>();
  private overlayOpen = new Subject<null>();
  private menuSource = new Subject<MenuChangeEvent>();
  private resetSource = new Subject();
  menuSource$ = this.menuSource.asObservable();
  resetSource$ = this.resetSource.asObservable();
  overlayOpen$ = this.overlayOpen.asObservable();

  _config: layoutConfig = this.loadConfigFromLocalStorage() || {
    preset: 'Lara',
    primary: 'sky',
    surface: null,
    darkTheme: false,
    menuMode: 'static',
  };

  _state: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  };

  layoutConfig = signal<layoutConfig>(this._config);
  layoutState = signal<LayoutState>(this._state);
  isDarkTheme = computed(() => this.layoutConfig().darkTheme);
  isOverlay = computed(() => this.layoutConfig().menuMode === 'overlay');

  constructor() {
    effect(() => {
      const config = this.layoutConfig();
      if (config) {
        this.onConfigUpdate();
      }
    });
    updatePreset(this.getPresetExt());
  }

  toggleDarkMode(config?: layoutConfig): void {
    const _config = config || this.layoutConfig();
    if (_config.darkTheme) {
      document.documentElement.classList.add('app-dark');
    } else {
      document.documentElement.classList.remove('app-dark');
    }
  }

  onMenuToggle() {
    if (this.isOverlay()) {
      this.layoutState.update((prev) => ({
        ...prev,
        overlayMenuActive: !this.layoutState().overlayMenuActive,
      }));

      if (this.layoutState().overlayMenuActive) {
        this.overlayOpen.next(null);
      }
    }

    if (this.isDesktop()) {
      this.layoutState.update((prev) => ({
        ...prev,
        staticMenuDesktopInactive:
          !this.layoutState().staticMenuDesktopInactive,
      }));
    } else {
      this.layoutState.update((prev) => ({
        ...prev,
        staticMenuMobileActive: !this.layoutState().staticMenuMobileActive,
      }));

      if (this.layoutState().staticMenuMobileActive) {
        this.overlayOpen.next(null);
      }
    }
  }

  isDesktop() {
    return window.innerWidth > 991;
  }

  onConfigUpdate() {
    this._config = { ...this.layoutConfig() };
    this.configUpdate.next(this.layoutConfig());
    this.saveConfigToLocalStorage(this._config);
    this.toggleDarkMode(this.layoutConfig());
  }

  onMenuStateChange(event: MenuChangeEvent) {
    this.menuSource.next(event);
  }

  updateTheme() {
    this.layoutConfig.update((state) => ({
      ...state,
      darkTheme: false,
    }));
  }

  getPresetExt() {
    const color = {
      name: 'sky',
      palette: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        950: '#082f49',
      },
    };
    return {
      semantic: {
        primary: color.palette,
        colorScheme: {
          light: {
            primary: {
              color: '{primary.500}',
              contrastColor: '#ffffff',
              hoverColor: '{primary.600}',
              activeColor: '{primary.700}',
            },
            highlight: {
              background: '{primary.50}',
              focusBackground: '{primary.100}',
              color: '{primary.700}',
              focusColor: '{primary.800}',
            },
          },
          dark: {
            primary: {
              color: '{primary.400}',
              contrastColor: '{surface.900}',
              hoverColor: '{primary.300}',
              activeColor: '{primary.200}',
            },
            highlight: {
              background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
              focusBackground:
                'color-mix(in srgb, {primary.400}, transparent 76%)',
              color: 'rgba(255,255,255,.87)',
              focusColor: 'rgba(255,255,255,.87)',
            },
          },
        },
      },
    };
  }

  private saveConfigToLocalStorage(config: layoutConfig): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(config));
  }

  private loadConfigFromLocalStorage(): layoutConfig | null {
    const config = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return config ? JSON.parse(config) : null;
  }
}
