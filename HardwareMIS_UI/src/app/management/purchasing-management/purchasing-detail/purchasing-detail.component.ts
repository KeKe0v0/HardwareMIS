import {
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  DialogService,
  ModalComponent,
  TableWidthConfig,
  ToastService,
} from 'ng-devui';
import { PurchasingManagementService } from '../service/purchasing-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchasing-detail',
  templateUrl: './purchasing-detail.component.html',
  styleUrls: ['./purchasing-detail.component.scss'],
})
export class PurchasingDetailComponent implements OnInit {
  @ViewChild('shipment', { static: true }) shipment: TemplateRef<any>;

  @Input() purchasingId: any;
  @Input() modalInstance: ModalComponent;

  path: string;
  purchasingDetailList: [];
  trackingNumber: string;
  dataTableOptions = {
    columns: [
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
      field: 'hardwareId',
      width: '2dvi',
    },
    {
      field: 'purchasingPrice',
      width: '1dvi',
    },
    {
      field: 'purchasingNumber',
      width: '1dvi',
    },
    {
      field: 'shippingTime',
      width: '2dvi',
    },
    {
      field: 'trackingNumber',
      width: '3dvi',
    },
    {
      field: 'status',
      width: '1dvi',
    },
  ];

  constructor(
    private elr: ElementRef,
    private purchasingManagementService: PurchasingManagementService,
    private toastService: ToastService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  parent: HTMLElement;

  ngOnInit() {
    this.path = this.router.routerState.snapshot.url;
    if (this.path === '/logistics-management') {
      this.tableWidthConfig.push({
        field: 'operate',
        width: '1.4dvi',
      });
    }
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
    this.modalInstance.hide();
  }

  openShipment(purchasingDetailId: string) {
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
            this.purchasingManagementService
              .shipment(purchasingDetailId, this.trackingNumber)
              .subscribe((response: any) => {
                if (response.success) {
                  this.purchasingDetailList =
                    response.data.purchasingDetailList;
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

  received(purchasingDetailId: string) {
    this.purchasingManagementService
      .received(purchasingDetailId)
      .subscribe((response: any) => {
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
}
