import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiBaseUrl;
const loginUrl = '/api/staff/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(staffId: string, password: string): Observable<any> {
    const loginData = {
      staffId: staffId,
      password: password,
    };
    return this.http.post(apiUrl + loginUrl, loginData, {
      withCredentials: true,
    });
  }
}
