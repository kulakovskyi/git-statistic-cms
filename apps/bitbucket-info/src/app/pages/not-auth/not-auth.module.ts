import { NgModule } from '@angular/core';
import { NotAuthLayoutComponent } from '@pages/not-auth/components/not-auth-layout/not-auth-layout.component';
import { RouterModule } from '@angular/router';
import { notAuthRoutes } from '@pages/not-auth-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: NotAuthLayoutComponent,
        children: notAuthRoutes,
      },
    ]),
  ],
  declarations: [NotAuthLayoutComponent],
})
export class NotAuthModule {}
