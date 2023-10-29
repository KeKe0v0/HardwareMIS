import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiBaseUrl;
const getStaffListUrl = '/api/staff/getStaffList';
const approvedUrl = '/api/staff/approved';
const deleteUrl = '/api/staff/delete';

@Injectable({
  providedIn: 'root',
})
export class StaffManagementService {
  constructor(private http: HttpClient) {}
  getStaffList(departmentId?, approved?): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const getStaffListData = {
      departmentId: departmentId,
      approved: approved,
    };
    return this.http.post(apiUrl + getStaffListUrl, getStaffListData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }

  approved(staffId: string, departmentId: string): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const approvedData = {
      staffId: staffId,
      departmentId: departmentId,
    };
    return this.http.post(apiUrl + approvedUrl, approvedData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }

  delete(staffId: string): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const deleteData = {
      staffId: staffId,
    };
    return this.http.post(apiUrl + deleteUrl, deleteData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }
}
