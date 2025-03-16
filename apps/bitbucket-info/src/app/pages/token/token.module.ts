import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenLayoutComponent } from '@pages/token/components/token-layout/token-layout.component';
import { LoaderComponent } from '@ui-kit';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TokenLayoutComponent,
      },
    ]),
    LoaderComponent,
  ],
  declarations: [TokenLayoutComponent],
})
export class TokenModule {}
