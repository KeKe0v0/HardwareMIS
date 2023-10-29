import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiBaseUrl;
const getInventoryListUrl = '/api/inventory/getInventoryList';
const getRestockListUrl = '/api/inventory/getRestockList';
const restockUrl = '/api/inventory/restock';
const stockOutUrl = '/api/inventory/stockOut';
const stockInUrl = '/api/inventory/stockIn';
const setPriceUrl = '/api/inventory/setPrice';

@Injectable({
  providedIn: 'root',
})
export class InventoryManagementService {
  constructor(private http: HttpClient) {}
  getInventoryList(): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const getInventoryListData = {};
    return this.http.post(apiUrl + getInventoryListUrl, getInventoryListData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }

  getRestockList(): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const getRestockListData = {};
    return this.http.post(apiUrl + getRestockListUrl, getRestockListData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }

  restock(hardwareId: string, restockNumber: number): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const restockData = {
      hardwareId: hardwareId,
      restockNumber: restockNumber,
    };
    return this.http.post(apiUrl + restockUrl, restockData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }

  stockOut(saleId: string): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const stockOutData = {
      saleId: saleId,
    };
    return this.http.post(apiUrl + stockOutUrl, stockOutData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }

  stockIn(purchasingDetailId: string): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const stockInData = {
      purchasingDetailId: purchasingDetailId,
    };
    return this.http.post(apiUrl + stockInUrl, stockInData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }

  setPrice(hardwareId: string, price: number, unit: string): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const setPriceData = {
      hardwareId: hardwareId,
      price: price,
      unit: unit,
    };
    return this.http.post(apiUrl + setPriceUrl, setPriceData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }
}
