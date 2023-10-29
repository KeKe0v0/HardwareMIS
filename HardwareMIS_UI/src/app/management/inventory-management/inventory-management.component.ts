import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableWidthConfig } from 'ng-devui/data-table';
import { InventoryManagementService } from './service/inventory-management.service';
import { DialogService, ModalService, ToastService } from 'ng-devui';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.scss'],
})
export class InventoryManagementComponent implements OnInit {
  constructor(
    private inventoryManagementService: InventoryManagementService,
    private toastService: ToastService,
    private modalService: ModalService,
    private dialogService: DialogService
  ) {}

  @ViewChild('restock', { static: true }) restock: TemplateRef<any>;
  @ViewChild('stockOut', { static: true }) stockOut: TemplateRef<any>;
  @ViewChild('stockIn', { static: true }) stockIn: TemplateRef<any>;
  @ViewChild('setPrice', { static: true }) setPrice: TemplateRef<any>;

  inventoryListData = [];
  price: number;
  unit: string;

  dataTableOptions = {
    columns: [
      {
        field: 'hardwareId',
        header: '硬件编号',
        fieldType: 'text',
      },
      {
        field: 'type',
        header: '类型',
        fieldType: 'text',
      },
      {
        field: 'model',
        header: '型号',
        fieldType: 'text',
      },
      {
        field: 'brand',
        header: '品牌',
        fieldType: 'text',
      },
      {
        field: 'price',
        header: '建议单价',
        fieldType: 'text',
      },
      {
        field: 'unit',
        header: '计价单位',
        fieldType: 'text',
      },
      {
        field: 'inventory',
        header: '库存',
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
      field: 'hardwareId',
      width: '6dvi',
    },
    {
      field: 'type',
      width: '6dvi',
    },
    {
      field: 'model',
      width: '8dvi',
    },
    {
      field: 'brand',
      width: '6dvi',
    },
    {
      field: 'price',
      width: '5dvi',
    },
    {
      field: 'unit',
      width: '5dvi',
    },
    {
      field: 'inventory',
      width: '5dvi',
    },
    {
      field: 'operate',
      width: '3dvi',
    },
  ];

  ngOnInit() {
    this.inventoryManagementService.getInventoryList().subscribe((response) => {
      if (response.success) {
        this.inventoryListData = response.data.inventoryList;
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

  openRestock() {
    this.modalService.open({
      id: 'restock-modal',
      width: '60dvi',
      backdropCloseable: false,
      contentTemplate: this.restock,
    });
  }

  openStockOut() {
    this.modalService.open({
      id: 'stock-out-modal',
      width: '90dvi',
      backdropCloseable: false,
      contentTemplate: this.stockOut,
    });
  }

  openStockIn() {
    this.modalService.open({
      id: 'stock-in-modal',
      width: '90dvi',
      backdropCloseable: false,
      contentTemplate: this.stockIn,
    });
  }

  closeStockModal() {
    this.inventoryManagementService.getInventoryList().subscribe((response) => {
      if (response.success) {
        this.inventoryListData = response.data.inventoryList;
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

  openSetPrice(hardwareId: string) {
    const results = this.dialogService.open({
      id: 'new-restock-dialog',
      width: '30dvi',
      title: '价格设定',
      contentTemplate: this.setPrice,
      backdropCloseable: false,
      buttons: [
        {
          cssClass: 'primary',
          text: '提交',
          handler: ($event: Event) => {
            this.inventoryManagementService
              .setPrice(hardwareId, this.price, this.unit)
              .subscribe((response) => {
                if (response.success) {
                  this.inventoryListData = response.data.inventoryList;
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
    this.price = value.price;
    this.unit = value.unit;
  }
}
