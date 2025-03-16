import { Route } from '@angular/router';
import { PAGE_ROUTES } from '@enums/page-routes.enum';

export const notAuthRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@pages/consumer-login/consumer-login.module').then(
        (m) => m.ConsumerLoginModule,
      ),
  },
  {
    path: PAGE_ROUTES.TOKEN,
    loadChildren: () =>
      import('@pages/token/token.module').then((m) => m.TokenModule),
  },

  { path: '**', redirectTo: '' },
];
