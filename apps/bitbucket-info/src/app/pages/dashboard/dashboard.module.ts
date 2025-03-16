import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from '@pages/dashboard/components/dashboard-layout.component';
import { UserStatisticComponent } from '@pages/dashboard/modules/user-statistic/user-statistic.component';
import { UserPieStatisticComponent } from '@pages/dashboard/modules/user-pie-statistic/user-pie-statistic.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DashboardLayoutComponent,
      },
    ]),
    UserStatisticComponent,
    UserPieStatisticComponent,
  ],
  declarations: [DashboardLayoutComponent],
})
export class DashboardModule {}
