import { Injectable } from '@angular/core';
import { BitBucketApiService } from '@api/bitbucket-api.service';
import {
  AccessTokenResponseDto,
  GetAccessTokenDto,
  LoginBitbucketDto,
} from '@globalTypes/bitbucket-dto';
import { LOCAL_STORAGE } from '@enums/local-storadge.enum';
import { Observable, switchMap, tap } from 'rxjs';
import { environment } from '@environment/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DynamicLoaderService } from '@services/dynamic-loader.serice';

@Injectable()
export class AuthService {
  private authLocalStorageToken = `${environment.token}`;

  constructor(
    private bitBucketApiService: BitBucketApiService,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private dynamicLoader: DynamicLoaderService,
    private router: Router,
  ) {}

  initializeUser() {
    this.dynamicLoader.isAuth.set(true);
  }

  loginInBitbucket(data: LoginBitbucketDto) {
    sessionStorage.setItem(
      LOCAL_STORAGE.BITBUCKET_CONSUMER,
      JSON.stringify(data),
    );
    this.bitBucketApiService.loginInBitbucket(data);
  }

  getAccessToken(): Observable<unknown> {
    return this.route.queryParams.pipe(
      switchMap((params) => {
        const code = params['code'];
        if (code) {
          return this.exchangeCodeForToken(code);
        } else {
          return new Observable();
        }
      }),
    );
  }

  exchangeCodeForToken(code: string): Observable<AccessTokenResponseDto> {
    const consumerData = JSON.parse(
      sessionStorage.getItem(LOCAL_STORAGE.BITBUCKET_CONSUMER) || '{}',
    );
    const data: GetAccessTokenDto = {
      client_id: consumerData.clientId,
      client_secret: consumerData.clientSecret,
      code: code,
      grant_type: LOCAL_STORAGE.AUTHORIZATION_CODE,
      redirect_uri: environment.redirectUri,
    };
    return this.bitBucketApiService.getAccessToken(data).pipe(
      tap((response: AccessTokenResponseDto) => {
        this.setAuthFromLocalStorage(
          response.access_token,
          response.refresh_token,
          response.expires_in,
        );
        this.loadAndNavigateToAuthModule().then();
      }),
    );
  }

  refreshToken() {
    const refreshToken = this.cookieService.get(LOCAL_STORAGE.REFRESH_TOKEN);
    if (refreshToken) {
      const consumerData = JSON.parse(
        sessionStorage.getItem(LOCAL_STORAGE.BITBUCKET_CONSUMER) || '{}',
      );
      this.bitBucketApiService
        .refreshAccessToken(refreshToken, {
          client_id: consumerData.clientId,
          client_secret: consumerData.clientSecret,
          redirect_uri: environment.redirectUri,
          grant_type: LOCAL_STORAGE.REFRESH_TOKEN,
        })
        .subscribe((response) => {
          this.setAuthFromLocalStorage(
            response.access_token,
            response.refresh_token,
            response.expires_in,
          );
        });
    }
  }

  getAuthFromLocalStorage(): string | undefined {
    try {
      return this.cookieService.get(this.authLocalStorageToken);
    } catch {
      return undefined;
    }
  }

  private async loadAndNavigateToAuthModule() {
    const authModule = await this.dynamicLoader.loadAuthModule();
    this.router.resetConfig([
      {
        path: '',
        loadChildren: () => Promise.resolve(authModule),
      },
    ]);
    return this.router.navigate(['/']).then();
  }

  private setAuthFromLocalStorage(
    token: string,
    refreshToken: string,
    expiresIn: number,
  ): boolean {
    if (token) {
      const expirationDate = new Date();
      expirationDate.setSeconds(expirationDate.getSeconds() + expiresIn);
      this.cookieService.set(this.authLocalStorageToken, token, expirationDate);
      this.cookieService.set(
        LOCAL_STORAGE.REFRESH_TOKEN,
        refreshToken,
        expirationDate,
      );
      this.setTokenRefreshTimer(expiresIn);
      return true;
    }
    return false;
  }

  private setTokenRefreshTimer(expiresIn: number) {
    const refreshTime = (expiresIn - 60) * 1000;
    setTimeout(() => {
      this.refreshToken();
    }, refreshTime);
  }
}
