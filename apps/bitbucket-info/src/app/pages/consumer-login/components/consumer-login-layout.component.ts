import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-consumer-login-layout',
  standalone: false,
  templateUrl: './consumer-login-layout.component.html',
  styleUrl: './consumer-login-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsumerLoginLayoutComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.initializeForm();
  }

  submit() {
    if (this.form.invalid) return;
    this.authService.loginInBitbucket(this.form.value);
  }

  private initializeForm() {
    this.form = new FormGroup({
      clientId: new FormControl('', [Validators.required]),
      clientSecret: new FormControl('', [Validators.required]),
    });
  }
}
