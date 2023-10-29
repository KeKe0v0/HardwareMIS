import { AfterContentChecked, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentChecked {
  title = '极客电脑硬件进销存信息管理系统';
  pageName = '';
  path = '';

  constructor(private router: Router) {}

  ngAfterContentChecked() {
    this.path = this.router.routerState.snapshot.url;
    switch (this.path) {
      case '/sale-management':
        this.pageName = '销售管理';
        break;
      case '/inventory-management':
        this.pageName = '库存管理';
        break;
      case '/purchasing-management':
        this.pageName = '采购管理';
        break;
      case '/logistics-management':
        this.pageName = '物流管理';
        break;
      case '/system-management':
        this.pageName = '系统管理';
        break;
    }
  }

  logout() {
    this.router.navigateByUrl('/login');
    this.deleteCookie('jwtToken');
    this.deleteCookie('staffId');
    this.deleteCookie('departmentId');
  }

  deleteCookie(cookieName) {
    document.cookie =
      cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  }
}
