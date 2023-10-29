import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiBaseUrl;
const getInfo = '/api/staff/getInfo';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  constructor(private http: HttpClient) {}
  getInfo(): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const getInfoData = {
      token: jwtToken,
    };
    return this.http.post(apiUrl + getInfo, getInfoData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }
}
