export interface LoginBitbucketDto {
  clientId: string;
  clientSecret: string;
}

export interface GetAccessTokenDto {
  client_id: string;
  client_secret: string;
  code: string;
  redirect_uri: string;
  grant_type: string;
}

export interface RefreshTokenDto {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  grant_type: string;
}

export interface AccessTokenResponseDto {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scopes: string;
  token_type: string;
}
