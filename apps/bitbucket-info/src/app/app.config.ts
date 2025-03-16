import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  ROUTES,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CustomToastrService, ModalService } from '@core-utils';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AppInterceptor } from '@services/app.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { DynamicLoaderService } from '@services/dynamic-loader.serice';
import Aura from '@primeng/themes/aura';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '@services/auth.service';
import { BitBucketApiService } from '@api/bitbucket-api.service';
import { CookieService } from 'ngx-cookie-service';

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise<void>((resolve) => {
      const token = authService.getAuthFromLocalStorage();
      if (!token) {
        resolve();
        return;
      } else {
        authService.initializeUser();
        resolve();
      }

      // const getCurrentUserPromise = new Promise<void>((resolveCurrentUser) => {
      //   initializeService.getCurrentUser().subscribe(() => {
      //     resolveCurrentUser();
      //   });
      // });
      //
      // getCurrentUserPromise
      //   .then(() => {
      //     return new Promise<void>((resolveAllUsers) => {
      //       initializeService.getAllUsers().subscribe(() => {
      //         resolveAllUsers();
      //       });
      //     });
      //   })
      //   .then(() => {
      //     resolve();
      //   });
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    BitBucketApiService,
    AuthService,
    DynamicLoaderService,
    ModalService,
    DialogService,
    MessageService,
    CookieService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withEnabledBlockingInitialNavigation(),
    ),
    provideHttpClient(withInterceptors([AppInterceptor])),
    provideAppInitializer(() => {
      const initializerFn = appInitializer(inject(AuthService));
      return initializerFn();
    }),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } },
    }),
    {
      provide: ROUTES,
      useFactory: (resolver: DynamicLoaderService) => resolver.resolveRoutes(),
      deps: [DynamicLoaderService],
      multi: true,
    },
    {
      provide: CustomToastrService,
      useClass: CustomToastrService,
      deps: [MessageService, DynamicDialogRef],
    },
  ],
};
