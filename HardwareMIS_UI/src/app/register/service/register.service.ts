import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiBaseUrl;
const registerUrl = '/api/staff/register';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(
    password: string,
    name: string,
    sex: number,
    birthday: Date,
    telephone: string,
    email: string,
    departmentId: number
  ): Observable<any> {
    const registerData = {
      password: password,
      name: name,
      sex: sex,
      birthday: birthday,
      telephone: telephone,
      email: email,
      departmentId: departmentId,
    };
    return this.http.post(apiUrl + registerUrl, registerData, {
      withCredentials: true,
    });
  }
}
