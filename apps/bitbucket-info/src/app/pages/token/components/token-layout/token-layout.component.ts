import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-token-layout',
  standalone: false,
  templateUrl: './token-layout.component.html',
  styleUrl: './token-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TokenLayoutComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAccessToken().subscribe();
  }
}
