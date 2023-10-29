import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  DataTableComponent,
  DialogService,
  TableWidthConfig,
  ToastService,
} from 'ng-devui';
import { PurchasingManagementService } from '../service/purchasing-management.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-stockout-purchasing',
  templateUrl: './stockout-purchasing.component.html',
  styleUrls: ['./stockout-purchasing.component.scss'],
})
export class StockoutPurchasingComponent implements OnInit {
  @ViewChild(DataTableComponent, { static: true })
  datatable: DataTableComponent;
  @ViewChild('selectSupplier', { static: true })
  selectSupplier: TemplateRef<any>;

  @Output() changeValueEvent = new EventEmitter<string>();

  supplierId: string = '';
  selectedSupplierId: string;
  selectedHardwareId: string;

  purchasingGroup = [];
  purchasingGroupIndex: number;

  restockList = [];
  restockIdList = [];
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
        field: 'restockNumber',
        header: '补货数量',
        fieldType: 'text',
      },
    ],
  };

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'checkbox',
      width: '1dvi',
    },
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
      field: 'type',
      width: '4dvi',
    },
    {
      field: 'model',
      width: '4dvi',
    },
    {
      field: 'brand',
      width: '4dvi',
    },
    {
      field: 'restockNumber',
      width: '4dvi',
    },
  ];

  constructor(
    private dialogService: DialogService,
    private toastService: ToastService,
    private purchasingManagementService: PurchasingManagementService
  ) {}

  ngOnInit() {
    this.purchasingManagementService.getStockoutList().subscribe((response) => {
      if (response.success) {
        this.restockList = response.data.restockList;
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

  add() {
    this.purchasingGroup.push({
      type: null,
      model: null,
      brand: null,
      purchasingPrice: null,
      restockNumber: null,
    });
  }

  delete(index) {
    this.purchasingGroup.splice(index, 1);
  }

  openSelectSupplier() {
    const results = this.dialogService.open({
      id: 'select-supplier-dialog',
      width: '80dvi',
      title: '选择供应商',
      contentTemplate: this.selectSupplier,
      backdropCloseable: false,
      buttons: [
        {
          cssClass: 'primary',
          text: '确定',
          handler: ($event: Event) => {
            this.supplierId = this.selectedSupplierId;
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

  selectedSupplier(selectedSupplierIdEvent: string) {
    this.selectedSupplierId = selectedSupplierIdEvent;
  }

  changeValue() {
    const event = {
      supplierId: this.supplierId,
      restockIdList: this.restockIdList,
      stockoutPurchasingList: this.purchasingGroup,
    };
    this.changeValueEvent.emit(JSON.stringify(event));
  }

  onRowCheckChange(checked, rowIndex, nestedIndex, rowItem) {
    rowItem.$checked = checked;
    rowItem.$halfChecked = false;
    this.datatable.setRowCheckStatus({
      rowIndex: rowIndex,
      nestedIndex: nestedIndex,
      rowItem: rowItem,
      checked: checked,
    });

    if (checked) {
      let index = this.purchasingGroup.findIndex(
        (item) => item.hardwareId === rowItem.hardwareId
      );
      if (index > -1) {
        this.purchasingGroup[index].restockNumber =
          this.purchasingGroup[index].restockNumber + rowItem.restockNumber;
      } else {
        this.purchasingGroup.push(JSON.parse(JSON.stringify(rowItem)));
      }
      this.restockIdList.push(rowItem.restockId);
    } else {
      let index = this.purchasingGroup.findIndex(
        (item) => item.hardwareId === rowItem.hardwareId
      );
      if (
        this.purchasingGroup[index].restockNumber - rowItem.restockNumber !==
        0
      ) {
        this.purchasingGroup[index].restockNumber =
          this.purchasingGroup[index].restockNumber - rowItem.restockNumber;
      } else {
        this.purchasingGroup.splice(index, 1);
      }
      let restockIdIndex = this.restockIdList.findIndex(
        (item) => item.restockId === rowItem.restockId
      );
      this.restockIdList.splice(restockIdIndex, 1);
    }
    const event = {
      supplierId: this.supplierId,
      restockIdList: this.restockIdList,
      stockoutPurchasingList: this.purchasingGroup,
    };
    this.changeValueEvent.emit(JSON.stringify(event));
  }
}
