import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TableWidthConfig, ToastService } from 'ng-devui';
import { SelectSupplierService } from './service/select-supplier.service';

@Component({
  selector: 'app-select-supplier',
  templateUrl: './select-supplier.component.html',
  styleUrls: ['./select-supplier.component.scss'],
})
export class SelectSupplierComponent implements OnInit {
  @Output() selectedSupplierIdEvent = new EventEmitter<string>();

  name: string = '';
  linkman: string = '';
  telephone: string = '';
  address: string = '';

  selectedSupplierId: string = '';

  supplierList = [];

  dataTableOptions = {
    columns: [
      {
        field: 'supplierId',
        header: '供应商编号',
        fieldType: 'text',
      },
      {
        field: 'name',
        header: '供应商名称',
        fieldType: 'text',
      },
      {
        field: 'address',
        header: '地址',
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
      field: 'supplierId',
      width: '4dvi',
    },
    {
      field: 'name',
      width: '5dvi',
    },
    {
      field: 'address',
      width: '6dvi',
    },
    {
      field: 'linkman',
      width: '2dvi',
    },
    {
      field: 'telephone',
      width: '4dvi',
    },
  ];

  constructor(
    private selectSupplierService: SelectSupplierService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.selectSupplierService.getSupplierList().subscribe((response) => {
      if (response.success) {
        this.supplierList = response.data.supplierList;
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

  rowSelect(supplierId: string) {
    this.selectedSupplierId = supplierId;
    this.selectedSupplierIdEvent.emit(supplierId);
  }

  newSupplier() {
    this.selectSupplierService
      .newSupplier(this.name, this.linkman, this.telephone, this.address)
      .subscribe((response) => {
        if (response.success) {
          this.name = '';
          this.linkman = '';
          this.telephone = '';
          this.address = '';
          this.supplierList = response.data.supplierList;
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
