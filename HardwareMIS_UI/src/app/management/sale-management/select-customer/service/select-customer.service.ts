import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiBaseUrl;
const getCustomerListUrl = '/api/customer/getCustomerList';
const newCustomerUrl = '/api/customer/newCustomer';

@Injectable({
  providedIn: 'root',
})
export class SelectCustomerService {
  constructor(private http: HttpClient) {}
  getCustomerList(): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const getCustomerListData = {};
    return this.http.post(apiUrl + getCustomerListUrl, getCustomerListData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }

  newCustomer(
    name: string,
    telephone: string,
    address: string,
    email: string
  ): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const newCustomerData = {
      name: name,
      telephone: telephone,
      address: address,
      email: email,
    };
    return this.http.post(apiUrl + newCustomerUrl, newCustomerData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }
}
