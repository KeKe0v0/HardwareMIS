import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiBaseUrl;
const getPurchasingListUrl = '/api/purchasing/getPurchasingList';
const newProductUrl = '/api/purchasing/newProduct';
const getPurchasingDetailListUrl = '/api/purchasing/getPurchasingDetailList';
const shipmentUrl = '/api/purchasing/shipment';
const receivedUrl = '/api/purchasing/received';
const stockoutPurchasingUrl = '/api/purchasing/stockoutPurchasing';
const getStockoutListUrl = '/api/purchasing/getStockoutList';

@Injectable({
  providedIn: 'root',
})
export class PurchasingManagementService {
  constructor(private http: HttpClient) {}
  getPurchasingList(): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const staffId = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'staffId')[0]
      .split('=')[1];
    const getPurchasingListData = {
      staffId: staffId,
    };
    return this.http.post(
      apiUrl + getPurchasingListUrl,
      getPurchasingListData,
      {
        withCredentials: true,
        headers: {
          token: jwtToken,
        },
      }
    );
  }

  newProduct(supplierId: string, purchasingGroup: any): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const staffId = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'staffId')[0]
      .split('=')[1];
    const newProductData = {
      supplierId: supplierId,
      staffId: staffId,
      newProductDetail: purchasingGroup,
    };
    return this.http.post(apiUrl + newProductUrl, newProductData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }

  getStockoutList(): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const getStockoutListData = {};
    return this.http.post(apiUrl + getStockoutListUrl, getStockoutListData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }

  stockoutPurchasing(
    supplierId: string,
    restockIdList: any,
    stockoutPurchasingList: any
  ): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const staffId = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'staffId')[0]
      .split('=')[1];
    const stockoutPurchasingData = {
      staffId: staffId,
      supplierId: supplierId,
      restockIdList: restockIdList,
      stockoutPurchasingList: stockoutPurchasingList,
    };
    return this.http.post(
      apiUrl + stockoutPurchasingUrl,
      stockoutPurchasingData,
      {
        withCredentials: true,
        headers: {
          token: jwtToken,
        },
      }
    );
  }

  getPurchasingDetailList(purchasingId: string): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const staffId = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'staffId')[0]
      .split('=')[1];
    const getPurchasingDetailListData = {
      purchasingId: purchasingId,
      staffId: staffId,
    };
    return this.http.post(
      apiUrl + getPurchasingDetailListUrl,
      getPurchasingDetailListData,
      {
        withCredentials: true,
        headers: {
          token: jwtToken,
        },
      }
    );
  }

  shipment(
    purchasingDetailId: string,
    trackingNumber: string
  ): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const shipmentData = {
      purchasingDetailId: purchasingDetailId,
      trackingNumber: trackingNumber,
    };
    return this.http.post(apiUrl + shipmentUrl, shipmentData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }

  received(purchasingDetailId: string): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const receivedData = {
      purchasingDetailId: purchasingDetailId,
    };
    return this.http.post(apiUrl + receivedUrl, receivedData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }
}
