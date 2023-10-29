import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ModalComponent, TableWidthConfig, ToastService } from 'ng-devui';
import { SaleManagementService } from '../service/sale-management.service';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.scss'],
})
export class SaleDetailComponent implements OnInit {
  @Input() saleId: any;
  @Input() modalInstance: ModalComponent;

  saleDetailList: [];

  dataTableOptions = {
    columns: [
      {
        field: 'hardwareId',
        header: '硬件编号',
        fieldType: 'text',
      },
      {
        field: 'salePrice',
        header: '销售单价',
        fieldType: 'text',
      },
      {
        field: 'saleNumber',
        header: '数量',
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
      field: 'hardwareId',
      width: '2dvi',
    },
    {
      field: 'salePrice',
      width: '2dvi',
    },
    {
      field: 'saleNumber',
      width: '1dvi',
    },
  ];

  constructor(
    private elr: ElementRef,
    private saleManagementService: SaleManagementService,
    private toastService: ToastService
  ) {}

  parent: HTMLElement;

  ngOnInit() {
    this.parent = this.elr.nativeElement.parentElement;
    this.saleManagementService
      .getSaleDetail(this.saleId)
      .subscribe((response) => {
        if (response.success) {
          this.saleDetailList = response.data.saleDetailList;
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

  close(event) {
    this.modalInstance.hide();
  }
}
