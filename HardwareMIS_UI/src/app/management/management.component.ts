import { Component, OnInit } from '@angular/core';
import { ManagementService } from './service/management.service';
import { Router } from '@angular/router';
import { ToastService } from 'ng-devui';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {
  constructor(
    private managementService: ManagementService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    const subscribe = this.managementService.getInfo().subscribe((response) => {
      if (response && response.success) {
        document.cookie = `staffId=${response.data.staffId}`;
        document.cookie = `departmentId=${response.data.departmentId}`;
        switch (response.data.departmentId) {
          case '00':
            this.router.navigateByUrl('/system-management');
            break;
          case '01':
            this.router.navigateByUrl('/sale-management');
            break;
          case '02':
            this.router.navigateByUrl('/inventory-management');
            break;
          case '03':
            this.router.navigateByUrl('/purchasing-management');
            break;
          case '04':
            this.router.navigateByUrl('/logistics-management');
            break;
        }
      } else {
        this.router.navigateByUrl('/login');
        this.toastService.open({
          value: [
            {
              content: '登录失效',
            },
          ],
        });
      }
    });
    setTimeout(() => {
      subscribe.unsubscribe();
    }, 100);
  }
}
