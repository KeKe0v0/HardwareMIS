import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  DialogService,
  ModalComponent,
  TableWidthConfig,
  ToastService,
} from 'ng-devui';
import { SaleManagementService } from '../../sale-management/service/sale-management.service';
import { InventoryManagementService } from '../service/inventory-management.service';
import { PurchasingManagementService } from '../../purchasing-management/service/purchasing-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-in',
  templateUrl: './stock-in.component.html',
  styleUrls: ['./stock-in.component.scss'],
})
export class StockInComponent implements OnInit {
  @Input() purchasingId: any;
  @Input() modalInstance: ModalComponent;
  @Output() closeEvent = new EventEmitter<any>();

  path: string;
  purchasingDetailList: [];
  dataTableOptions = {
    columns: [
      {
        field: 'purchasingId',
        header: '采购编号',
        fieldType: 'text',
      },
      {
        field: 'hardwareId',
        header: '硬件编号',
        fieldType: 'text',
      },
      {
        field: 'purchasingPrice',
        header: '采购单价',
        fieldType: 'text',
      },
      {
        field: 'purchasingNumber',
        header: '数量',
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
      field: 'purchasingId',
      width: '2dvi',
    },
    {
      field: 'purchasingNumber',
      width: '2dvi',
    },
    {
      field: 'shippingTime',
      width: '1dvi',
    },
    {
      field: 'trackingNumber',
      width: '1dvi',
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

  constructor(
    private elr: ElementRef,
    private purchasingManagementService: PurchasingManagementService,
    private toastService: ToastService,
    private inventoryManagementService: InventoryManagementService
  ) {}

  parent: HTMLElement;

  ngOnInit() {
    this.parent = this.elr.nativeElement.parentElement;
    this.purchasingManagementService
      .getPurchasingDetailList(this.purchasingId)
      .subscribe((response) => {
        if (response.success) {
          this.purchasingDetailList = response.data.purchasingDetailList;
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
    this.closeEvent.emit();
    this.modalInstance.hide();
  }

  stockIn(purchasingDetailId: string) {
    this.inventoryManagementService
      .stockIn(purchasingDetailId)
      .subscribe((response: any) => {
        if (response.success) {
          this.purchasingDetailList = response.data.purchasingDetailList;
          this.toastService.open({
            value: [
              {
                content: '入库成功',
              },
            ],
          });
        } else {
          this.toastService.open({
            value: [
              {
                content: '入库失败',
              },
            ],
          });
        }
      });
  }
}
