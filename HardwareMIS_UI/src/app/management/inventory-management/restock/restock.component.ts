import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { InventoryManagementService } from '../service/inventory-management.service';
import {
  DialogService,
  ModalComponent,
  ModalService,
  TableWidthConfig,
  ToastService,
} from 'ng-devui';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.scss'],
})
export class RestockComponent implements OnInit {
  constructor(
    private inventoryManagementService: InventoryManagementService,
    private toastService: ToastService,
    private dialogService: DialogService
  ) {}

  @ViewChild('newRestock', { static: true })
  newRestock: TemplateRef<any>;

  @Input() modalInstance: ModalComponent;

  restockListData = [];
  hardwareId = null;
  restockNumber = null;

  dataTableOptions = {
    columns: [
      {
        field: 'restockId',
        header: '补货编号',
        fieldType: 'text',
      },
      {
        field: 'hardwareId',
        header: '硬件编号',
        fieldType: 'text',
      },
      {
        field: 'restockNumber',
        header: '补货数量',
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
      width: '3dvi',
    },
    {
      field: 'restockId',
      width: '6dvi',
    },
    {
      field: 'hardwareId',
      width: '6dvi',
    },
    {
      field: 'restockNumber',
      width: '4dvi',
    },
    {
      field: 'status',
      width: '4dvi',
    },
  ];

  ngOnInit() {
    this.inventoryManagementService.getRestockList().subscribe((response) => {
      if (response.success) {
        this.restockListData = response.data.restockList;
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

  openNewRestock() {
    const results = this.dialogService.open({
      id: 'new-restock-dialog',
      width: '40dvi',
      title: '新建申请',
      contentTemplate: this.newRestock,
      backdropCloseable: false,
      buttons: [
        {
          cssClass: 'primary',
          text: '提交',
          handler: ($event: Event) => {
            this.inventoryManagementService
              .restock(this.hardwareId, this.restockNumber)
              .subscribe((response) => {
                if (response.success) {
                  this.restockListData = response.data.restockList;
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
    this.hardwareId = value.hardwareId;
    this.restockNumber = value.restockNumber;
  }

  close(event) {
    this.modalInstance.hide();
  }
}
