import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectCustomerService } from './service/select-customer.service';
import { TableWidthConfig, ToastService } from 'ng-devui';

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.scss'],
})
export class SelectCustomerComponent implements OnInit {
  @Output() selectedCustomerIdEvent = new EventEmitter<string>();

  name: string = '';
  telephone: string = '';
  address: string = '';
  email: string = '';

  selectedCustomerId: string = '';

  customerList = [];

  dataTableOptions = {
    columns: [
      {
        field: 'customerId',
        header: '客户编号',
        fieldType: 'text',
      },
      {
        field: 'name',
        header: '姓名',
        fieldType: 'text',
      },
      {
        field: 'telephone',
        header: '联系电话',
        fieldType: 'text',
      },
      {
        field: 'address',
        header: '地址',
        fieldType: 'text',
      },
      {
        field: 'email',
        header: '邮箱',
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
      field: 'customerId',
      width: '4dvi',
    },
    {
      field: 'name',
      width: '2dvi',
    },
    {
      field: 'telephone',
      width: '3dvi',
    },
    {
      field: 'address',
      width: '6dvi',
    },
    {
      field: 'email',
      width: '4dvi',
    },
  ];

  constructor(
    private selectCustomerService: SelectCustomerService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.selectCustomerService.getCustomerList().subscribe((response) => {
      if (response.success) {
        this.customerList = response.data.customerList;
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

  rowSelect(customerId: string) {
    this.selectedCustomerId = customerId;
    this.selectedCustomerIdEvent.emit(customerId);
  }

  newCustomer() {
    this.selectCustomerService
      .newCustomer(this.name, this.telephone, this.address, this.email)
      .subscribe((response) => {
        if (response.success) {
          this.name = '';
          this.telephone = '';
          this.address = '';
          this.email = '';
          this.customerList = response.data.customerList;
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
