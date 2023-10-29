import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, TableWidthConfig, ToastService } from 'ng-devui';
import { DepartmentManagementService } from './service/department-management.service';

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styleUrls: ['./department-management.component.scss'],
})
export class DepartmentManagementComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    private departmentManagementService: DepartmentManagementService,
    private toastService: ToastService
  ) {}

  @ViewChild('editDepartment', { static: true })
  editDepartment: TemplateRef<any>;

  departmentListData = [];

  selectedStaffId = '';
  selectDepartmentId = '';

  dataTableOptions = {
    columns: [
      {
        field: 'departmentId',
        header: '部门编号',
        fieldType: 'text',
      },
      {
        field: 'departmentName',
        header: '部门名',
        fieldType: 'text',
      },
      {
        field: 'linkman',
        header: '联系人',
        fieldType: 'text',
      },
      {
        field: 'telephone',
        header: '联系电话',
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
      field: 'departmentId',
      width: '2dvi',
    },
    {
      field: 'departmentName',
      width: '2dvi',
    },
    {
      field: 'linkman',
      width: '2dvi',
    },
    {
      field: 'telephone',
      width: '2dvi',
    },
    {
      field: 'operate',
      width: '2dvi',
    },
  ];

  ngOnInit() {
    this.departmentManagementService
      .getDepartmentList()
      .subscribe((response) => {
        if (response.success) {
          this.departmentListData = response.data.departmentList;
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

  openEditDepartment(selectDepartmentId) {
    this.selectDepartmentId = selectDepartmentId;

    const results = this.dialogService.open({
      id: 'edit-department-dialog',
      width: '30dvi',
      title: '编辑部门',
      contentTemplate: this.editDepartment,
      backdropCloseable: false,
      buttons: [
        {
          cssClass: 'primary',
          text: '提交',
          handler: ($event: Event) => {
            this.departmentManagementService
              .editDepartment(this.selectDepartmentId, this.selectedStaffId)
              .subscribe((response) => {
                if (response.success) {
                  this.departmentListData = response.data.departmentList;
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
            results.modalInstance.hide();
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: '取消',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
    });
  }

  selectedStaff(selectedStaffIdEvent: string) {
    this.selectedStaffId = selectedStaffIdEvent;
  }
}
