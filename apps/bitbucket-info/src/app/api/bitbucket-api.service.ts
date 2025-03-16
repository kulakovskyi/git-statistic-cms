import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  AccessTokenResponseDto,
  GetAccessTokenDto,
  LoginBitbucketDto,
  RefreshTokenDto,
} from '@globalTypes/bitbucket-dto';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

@Injectable()
export class BitBucketApiService {
  constructor(private http: HttpClient) {}

  loginInBitbucket(data: LoginBitbucketDto) {
    window.location.href = `${environment.authUrl}authorize?client_id=${data.clientId}&response_type=code&redirect_uri=${environment.redirectUri}`;
  }

  getAccessToken(data: GetAccessTokenDto): Observable<AccessTokenResponseDto> {
    const body = this.createBody({
      client_id: data.client_id,
      client_secret: data.client_secret,
      code: data.code,
      grant_type: 'authorization_code',
      redirect_uri: data.redirect_uri,
    });
    return this.http.post<AccessTokenResponseDto>(
      'access_token',
      body.toString(),
      { headers: this.createHeaders() },
    );
  }

  refreshAccessToken(
    refreshToken: string,
    body: RefreshTokenDto,
  ): Observable<AccessTokenResponseDto> {
    const params = this.createBody({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: body.client_id,
      client_secret: body.client_secret,
    });
    return this.http.post<AccessTokenResponseDto>(
      'access_token',
      params.toString(),
      { headers: this.createHeaders() },
    );
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
  }

  private createBody(params: { [key: string]: string }): HttpParams {
    let body = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        body = body.set(key, params[key]);
      }
    }
    return body;
  }
}
