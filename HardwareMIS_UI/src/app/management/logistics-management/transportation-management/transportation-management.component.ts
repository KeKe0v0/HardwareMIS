import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, TableWidthConfig, ToastService } from 'ng-devui';
import { SaleManagementService } from '../../sale-management/service/sale-management.service';

@Component({
  selector: 'app-transportation-management',
  templateUrl: './transportation-management.component.html',
  styleUrls: ['./transportation-management.component.scss'],
})
export class TransportationManagementComponent implements OnInit {
  constructor(
    private saleManagementService: SaleManagementService,
    private toastService: ToastService,
    private dialogService: DialogService
  ) {}

  @ViewChild('shipment', { static: true }) shipment: TemplateRef<any>;

  saleList = [];

  trackingNumber: string;

  dataTableOptions = {
    columns: [
      {
        field: 'saleId',
        header: '销售编号',
        fieldType: 'text',
      },
      {
        field: 'orderTime',
        header: '下单时间',
        fieldType: 'text',
      },
      {
        field: 'recipient',
        header: '收件人',
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
        field: 'shippingTime',
        header: '发货时间',
        fieldType: 'text',
      },
      {
        field: 'trackingNumber',
        header: '物流单号',
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
      field: 'saleId',
      width: '2dvi',
    },
    {
      field: 'orderTime',
      width: '2dvi',
    },
    {
      field: 'recipient',
      width: '1dvi',
    },
    {
      field: 'telephone',
      width: '2dvi',
    },
    {
      field: 'address',
      width: '2dvi',
    },
    {
      field: 'shippingTime',
      width: '2dvi',
    },
    {
      field: 'trackingNumber',
      width: '2dvi',
    },
    {
      field: 'status',
      width: '1dvi',
    },
    {
      field: 'operate',
      width: '1dvi',
    },
  ];

  ngOnInit() {
    this.saleManagementService.getSaleList().subscribe((response) => {
      if (response.success) {
        this.saleList = response.data.saleList;
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

  openShipment(saleId: string) {
    const results = this.dialogService.open({
      id: 'shipment-dialog',
      width: '30dvi',
      title: '发货处理',
      contentTemplate: this.shipment,
      backdropCloseable: false,
      buttons: [
        {
          cssClass: 'primary',
          text: '提交',
          handler: ($event: Event) => {
            this.saleManagementService
              .shipment(saleId, this.trackingNumber)
              .subscribe((response: any) => {
                if (response.success) {
                  this.saleList = response.data.saleList;
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

  changeValue(event) {
    this.trackingNumber = event;
  }
}
