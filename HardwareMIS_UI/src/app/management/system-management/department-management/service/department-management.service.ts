import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiBaseUrl;
const getDepartmentListUrl = '/api/department/getDepartmentList';
const editDepartmentUrl = '/api/department/editDepartment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentManagementService {
  constructor(private http: HttpClient) {}
  getDepartmentList(): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const getDepartmentListData = {};
    return this.http.post(
      apiUrl + getDepartmentListUrl,
      getDepartmentListData,
      {
        withCredentials: true,
        headers: {
          token: jwtToken,
        },
      }
    );
  }

  editDepartment(departmentId, staffId): Observable<any> {
    const jwtToken = document.cookie
      .split(';')
      .filter((x) => x.split('=')[0].trim() === 'jwtToken')[0]
      .split('=')[1];
    const editDepartmentData = {
      departmentId: departmentId,
      staffId: staffId,
    };
    return this.http.post(apiUrl + editDepartmentUrl, editDepartmentData, {
      withCredentials: true,
      headers: {
        token: jwtToken,
      },
    });
  }
}
