import { NgModule } from '@angular/core';
import { AuthLayoutComponent } from '@pages/auth/components/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { authPagesRoutes } from '@pages/auth-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AuthLayoutComponent,
        children: authPagesRoutes,
      },
    ]),
  ],
  declarations: [AuthLayoutComponent],
})
export class AuthModule {}
