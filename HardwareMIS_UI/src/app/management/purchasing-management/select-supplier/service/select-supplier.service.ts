import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiBaseUrl;
const getSupplierListUrl = '/api/supplier/getSupplierList';
const newSupplierUrl = '/api/supplier/newSupplier';

@Injectable({
  providedIn: 'root',
})
export class SelectSupplierService {
  constructor(private http: HttpClient) {}
  getSupplierList(): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const getSupplierListData = {};
    return this.http.post(apiUrl + getSupplierListUrl, getSupplierListData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }

  newSupplier(
    name: string,
    linkman: string,
    telephone: string,
    address: string
  ): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const newSupplierData = {
      name: name,
      linkman: linkman,
      telephone: telephone,
      address: address,
    };
    return this.http.post(apiUrl + newSupplierUrl, newSupplierData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }
}
