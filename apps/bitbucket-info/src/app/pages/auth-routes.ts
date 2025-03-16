import { Route } from '@angular/router';
import { PAGE_ROUTES } from '@enums/page-routes.enum';

export const authPagesRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule,
      ),
  },
  {
    path: PAGE_ROUTES.PROFILE,
    loadChildren: () =>
      import('@pages/profile/profile.module').then((m) => m.ProfileModule),
  },
];
