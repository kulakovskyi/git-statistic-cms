import { Injectable, signal } from '@angular/core';
import { Routes } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DynamicLoaderService {
  isAuth = signal<boolean>(false);

  async loadAuthModule() {
    const module = await import('@pages/auth/auth.module');
    return module.AuthModule;
  }

  async loadNotAuthModule() {
    const module = await import('@pages/not-auth/not-auth.module');
    return module.NotAuthModule;
  }

  resolveRoutes(): Routes {
    return [
      {
        path: '',
        loadChildren: () =>
          this.isAuth()
            ? import('@pages/auth/auth.module').then((m) => m.AuthModule)
            : import('@pages/not-auth/not-auth.module').then(
                (m) => m.NotAuthModule,
              ),
      },
    ];
  }
}
