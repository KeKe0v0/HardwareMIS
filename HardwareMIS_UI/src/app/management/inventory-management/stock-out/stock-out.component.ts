import {
  Component,
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
import { InventoryManagementService } from '../service/inventory-management.service';
import { SaleManagementService } from '../../sale-management/service/sale-management.service';

@Component({
  selector: 'app-stock-out',
  templateUrl: './stock-out.component.html',
  styleUrls: ['./stock-out.component.scss'],
})
export class StockOutComponent implements OnInit {
  constructor(
    private inventoryManagementService: InventoryManagementService,
    private toastService: ToastService,
    private saleManagementService: SaleManagementService
  ) {}

  @Input() modalInstance: ModalComponent;
  @Output() closeEvent = new EventEmitter<any>();

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

  close(event) {
    this.closeEvent.emit();
    this.modalInstance.hide();
  }

  stockOut(saleId: string) {
    this.inventoryManagementService
      .stockOut(saleId)
      .subscribe((response: any) => {
        if (response.success) {
          this.saleList = response.data.saleList;
          this.toastService.open({
            value: [
              {
                content: '出库成功',
              },
            ],
          });
        } else {
          this.toastService.open({
            value: [
              {
                content: '出库失败',
              },
            ],
          });
        }
      });
  }
}
