import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiBaseUrl;
const getSaleListUrl = '/api/sale/getSaleList';
const getSaleDetailUrl = '/api/sale/getSaleDetail';
const newSaleOrderUrl = '/api/sale/newSaleOrder';
const shipmentUrl = '/api/sale/shipment';

@Injectable({
  providedIn: 'root',
})
export class SaleManagementService {
  constructor(private http: HttpClient) {}
  getSaleList(): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const staffId = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'staffId')[0]
      .split('=')[1];
    const getSaleListData = {
      staffId: staffId,
    };
    return this.http.post(apiUrl + getSaleListUrl, getSaleListData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }

  getSaleDetail(saleId): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const getSaleDetailData = {
      saleId: saleId,
    };
    return this.http.post(apiUrl + getSaleDetailUrl, getSaleDetailData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }

  newSaleOrder(customerId: string, saleGroup: any): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const staffId = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'staffId')[0]
      .split('=')[1];
    const newSaleOrderData = {
      staffId: staffId,
      customerId: customerId,
      saleDetail: saleGroup,
    };
    return this.http.post(apiUrl + newSaleOrderUrl, newSaleOrderData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }

  shipment(saleId: string, trackingNumber: string) {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const shipmentData = {
      saleId: saleId,
      trackingNumber: trackingNumber,
    };
    return this.http.post(apiUrl + shipmentUrl, shipmentData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }
}
