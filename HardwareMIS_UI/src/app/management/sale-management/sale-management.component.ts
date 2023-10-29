import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, ModalService, ToastService } from 'ng-devui';
import { TableWidthConfig } from 'ng-devui/data-table';
import { SaleManagementService } from './service/sale-management.service';

@Component({
  selector: 'app-sale-management',
  templateUrl: './sale-management.component.html',
  styleUrls: ['./sale-management.component.scss'],
})
export class SaleManagementComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    private modalService: ModalService,
    private saleManagementService: SaleManagementService,
    private toastService: ToastService
  ) {}

  @ViewChild('newSaleOrder', { static: true }) newSaleOrder: TemplateRef<any>;
  @ViewChild('saleDetail', { static: true }) saleDetail: TemplateRef<any>;

  saleList = [];

  customerId: string;
  saleGroup: any;

  saleId: string;

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

  openNewSaleOrder() {
    const results = this.dialogService.open({
      id: 'new-sale-order-dialog',
      width: '80dvi',
      title: '新建销售单',
      contentTemplate: this.newSaleOrder,
      backdropCloseable: false,
      buttons: [
        {
          cssClass: 'primary',
          text: '提交',
          handler: ($event: Event) => {
            this.saleManagementService
              .newSaleOrder(this.customerId, this.saleGroup)
              .subscribe((response) => {
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

  openSaleDetail(saleId) {
    this.saleId = saleId;
    this.modalService.open({
      id: 'sale-detail-modal',
      width: '60dvi',
      backdropCloseable: false,
      contentTemplate: this.saleDetail,
    });
  }

  changeValue(event) {
    const value = JSON.parse(event);
    this.customerId = value.customerId;
    this.saleGroup = value.saleGroup;
  }
}
