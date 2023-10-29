import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableWidthConfig, ToastService } from 'ng-devui';
import { StaffManagementService } from '../../staff-management/service/staff-management-service.service';

@Component({
  selector: 'app-select-staff',
  templateUrl: './select-staff.component.html',
  styleUrls: ['./select-staff.component.scss'],
})
export class SelectStaffComponent implements OnInit {
  @Input() selectDepartmentId: string;
  @Output() selectedStaffIdEvent = new EventEmitter<string>();

  selectedStaffId: string = '';

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
  ];

  constructor(
    private staffManagementService: StaffManagementService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.staffManagementService
      .getStaffList(this.selectDepartmentId, 1)
      .subscribe((response) => {
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

  rowSelect(staffId: string) {
    this.selectedStaffId = staffId;
    this.selectedStaffIdEvent.emit(staffId);
  }
}
