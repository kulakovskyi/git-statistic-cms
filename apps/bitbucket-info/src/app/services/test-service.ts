import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BitbucketService {
  private apiUrl = 'https://api.bitbucket.org/2.0';
  private token =
    'gtXEuo-Y5h7b4yZxNPyIraLfHK7zlZsJrsmXYZXKEtDpAxsqTN5KU-EN0ikgnc_7ognbvNYJujAHIDHE1lUqMjVDcn1HpBqugAt3-V6LewVI0-719ioMskurgJhm7S1z'; // Замените на ваш токен или OAuth-ключ

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {}

  // getRepositories(username: string): Observable<any> {
  //   const url = `${this.apiUrl}/repositories/${username}`;
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  //   return this.http.get<any>(url, { headers });
  // }

  getCommits(repositorySlug: string, username: string): Observable<any> {
    const url = `${this.apiUrl}/repositories/${username}/${repositorySlug}/commits`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`,
    );
    return this.http.get<any>(url, { headers });
  }

  getRepositories(workspace: string): Observable<any> {
    const url = `repositories/${workspace}`;
    return this.http.get<any>(url);
  }

  private clientId = 'es5jfQmdWyUwjab8yX'; // Ваш client_id
  private clientSecret = '9h89WFWZddhP2wsZU5rp6WNsnue2h5vZ'; // Ваш client_secret
  private redirectUri = 'http://localhost:4200/token'; // Ваш redirect_uri

  // Шаг 1: Перенаправление пользователя на страницу авторизации
  redirectToBitbucketAuth(): void {
    const authUrl = `https://bitbucket.org/site/oauth2/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirectUri}`;
    window.location.href = authUrl; // Перенаправляем пользователя на страницу авторизации
  }

  // Шаг 2: Обмен авторизационного кода на токен
  getAccessToken(): Observable<any> {
    return new Observable((observer) => {
      // Извлекаем параметр 'code' из URL

      this.route.queryParams.subscribe((params) => {
        const code = params['code'];

        console.log(params);

        if (code) {
          // Если код присутствует, отправляем запрос для получения токена
          this.exchangeCodeForToken(code).subscribe(
            (response) => {
              console.log('Access Token:', response);
              observer.next(response); // Возвращаем ответ с токеном
            },
            (error) => {
              console.error('Ошибка при получении токена:', error);
              observer.error(error); // Обработка ошибок
            },
          );
        } else {
          console.log('Код не найден в URL');
        }
      });
    });
  }

  exchangeCodeForToken(code: string): Observable<any> {
    const tokenUrl = 'https://bitbucket.org/site/oauth2/access_token';
    const body = new HttpParams()
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
      .set('code', code)
      .set('grant_type', 'authorization_code')
      .set('redirect_uri', this.redirectUri);

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
    return this.http.post<any>(tokenUrl, body.toString(), { headers });
  }

  getTeamMembers(teamSlug: string): Observable<any> {
    const url = `${this.apiUrl}/workspaces/${teamSlug}/members?page=2`;

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`,
    );

    return this.http.get<any>(url, { headers });
  }
}
