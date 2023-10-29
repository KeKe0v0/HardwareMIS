import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  DialogService,
  ModalService,
  TableWidthConfig,
  ToastService,
} from 'ng-devui';
import { PurchasingManagementService } from '../../purchasing-management/service/purchasing-management.service';

@Component({
  selector: 'app-receiving-management',
  templateUrl: './receiving-management.component.html',
  styleUrls: ['./receiving-management.component.scss'],
})
export class ReceivingManagementComponent implements OnInit {
  constructor(
    private purchasingManagementService: PurchasingManagementService,
    private toastService: ToastService,
    private dialogService: DialogService,
    private modalService: ModalService
  ) {}

  @ViewChild('newProduct', { static: true }) newProduct: TemplateRef<any>;
  @ViewChild('purchasingDetail', { static: true })
  purchasingDetail: TemplateRef<any>;

  supplierId: string = '';

  purchasingId: string;

  purchasingGroup = [
    {
      type: null,
      model: null,
      brand: null,
      purchasingPrice: null,
      pruchasingNumber: null,
    },
  ];

  purchasingList = [];

  dataTableOptions = {
    columns: [
      {
        field: 'purchasingId',
        header: '采购编号',
        fieldType: 'text',
      },
      {
        field: 'orderTime',
        header: '采购时间',
        fieldType: 'text',
      },
      {
        field: 'supplier',
        header: '供应商',
        fieldType: 'text',
      },
    ],
  };

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: '#',
      width: '2dvi',
    },
    {
      field: 'purchasingId',
      width: '4dvi',
    },
    {
      field: 'orderTime',
      width: '4dvi',
    },
    {
      field: 'supplier',
      width: '4dvi',
    },
    {
      field: 'operate',
      width: '2dvi',
    },
  ];

  ngOnInit() {
    this.purchasingManagementService
      .getPurchasingList()
      .subscribe((response) => {
        if (response.success) {
          this.purchasingList = response.data.purchasingList;
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

  openNewProduct() {
    const results = this.dialogService.open({
      id: 'new-product-dialog',
      width: '80dvi',
      title: '新品采购',
      contentTemplate: this.newProduct,
      backdropCloseable: false,
      buttons: [
        {
          cssClass: 'primary',
          text: '提交',
          handler: ($event: Event) => {
            this.purchasingManagementService
              .newProduct(this.supplierId, this.purchasingGroup)
              .subscribe((response) => {
                if (response.success) {
                  this.purchasingList = response.data.purchasingList;
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
    const value = JSON.parse(event);
    this.supplierId = value.supplierId;
    this.purchasingGroup = value.purchasingGroup;
  }

  openPurchasingDetail(purchasingId: string) {
    this.purchasingId = purchasingId;
    this.modalService.open({
      id: 'purchasing-detail-modal',
      width: '90dvi',
      backdropCloseable: false,
      contentTemplate: this.purchasingDetail,
    });
  }
}
