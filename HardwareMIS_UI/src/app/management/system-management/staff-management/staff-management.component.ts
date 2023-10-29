import { Component, OnInit } from '@angular/core';
import { TableWidthConfig, ToastService } from 'ng-devui';
import { StaffManagementService } from './service/staff-management-service.service';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss'],
})
export class StaffManagementComponent implements OnInit {
  constructor(
    private staffManagementService: StaffManagementService,
    private toastService: ToastService
  ) {}

  staffListData = [];

  dataTableOptions = {
    columns: [
      {
        field: 'staffId',
        header: '员工编号',
        fieldType: 'text',
      },
      {
        field: 'name',
        header: '姓名',
        fieldType: 'text',
      },
      {
        field: 'sex',
        header: '性别',
        fieldType: 'text',
      },
      {
        field: 'birthday',
        header: '出生日期',
        fieldType: 'text',
      },
      {
        field: 'telephone',
        header: '联系电话',
        fieldType: 'text',
      },
      {
        field: 'email',
        header: '邮箱',
        fieldType: 'text',
      },
      {
        field: 'department',
        header: '所属部门',
        fieldType: 'text',
      },
      {
        field: 'status',
        header: '状态',
        fieldType: 'text',
      },
    ],
  };

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: '#',
      width: '1dvi',
    },
    {
      field: 'staffId',
      width: '2dvi',
    },
    {
      field: 'name',
      width: '2dvi',
    },
    {
      field: 'sex',
      width: '1dvi',
    },
    {
      field: 'birthday',
      width: '2dvi',
    },
    {
      field: 'telephone',
      width: '2dvi',
    },
    {
      field: 'email',
      width: '4dvi',
    },
    {
      field: 'department',
      width: '2dvi',
    },
    {
      field: 'status',
      width: '2dvi',
    },
    {
      field: 'operate',
      width: '2dvi',
    },
  ];

  ngOnInit() {
    this.staffManagementService.getStaffList().subscribe((response) => {
      if (response.success) {
        this.staffListData = response.data.staffList;
      } else {
        this.toastService.open({
          value: [
            {
              content: '数据获取失败',
            },
          ],
        });
      }
    });
  }

  approved(staffId: string, departmentId: string) {
    this.staffManagementService
      .approved(staffId, departmentId)
      .subscribe((response) => {
        if (response.success) {
          this.staffListData = response.data.staffList;
        } else {
          this.toastService.open({
            value: [
              {
                content: '操作失败',
              },
            ],
          });
        }
      });
  }

  delete(staffId: string) {
    this.staffManagementService.delete(staffId).subscribe((response) => {
      if (response.success) {
        this.staffListData = response.data.staffList;
      } else {
        this.toastService.open({
          value: [
            {
              content: '操作失败',
            },
          ],
        });
      }
    });
  }
}
