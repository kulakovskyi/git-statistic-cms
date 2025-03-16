import { NgModule } from '@angular/core';
import { ProfileLayoutComponent } from '@pages/profile/components/profile-layout/profile-layout.component';
import { RouterModule } from '@angular/router';
import { PAGE_ROUTES } from '@enums/page-routes.enum';
import { ProfileAsideComponent } from '@pages/profile/modules/profile-aside/profile-aside.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProfileLayoutComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                '@pages/profile/partials/profile-main/profile-main.component'
              ).then((m) => m.ProfileMainComponent),
          },
          {
            path: PAGE_ROUTES.CHANGE_PASSWORD,
            loadComponent: () =>
              import(
                '@pages/profile/partials/change-password/change-password.component'
              ).then((m) => m.ChangePasswordComponent),
          },
          {
            path: PAGE_ROUTES.TELEGRAM,
            loadComponent: () =>
              import(
                '@pages/profile/partials/telegram-token/telegram-token.component'
              ).then((m) => m.TelegramTokenComponent),
          },
        ],
      },
    ]),
    ProfileAsideComponent,
  ],
  declarations: [ProfileLayoutComponent],
})
export class ProfileModule {}
