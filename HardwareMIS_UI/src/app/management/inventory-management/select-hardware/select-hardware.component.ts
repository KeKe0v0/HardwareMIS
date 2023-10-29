import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TableWidthConfig, ToastService } from 'ng-devui';
import { InventoryManagementService } from '../service/inventory-management.service';

@Component({
  selector: 'app-select-hardware',
  templateUrl: './select-hardware.component.html',
  styleUrls: ['./select-hardware.component.scss'],
})
export class SelectHardwareComponent implements OnInit {
  constructor(
    private inventoryManagementService: InventoryManagementService,
    private toastService: ToastService
  ) {}

  @Output() selectedHardwareIdEvent = new EventEmitter<string>();

  inventoryListData = [];
  selectedHardwareId: string;

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
      width: '3dvi',
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
      width: '10dvi',
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

  rowSelect(hardwareId: string) {
    this.selectedHardwareId = hardwareId;
    this.selectedHardwareIdEvent.emit(hardwareId);
  }
}
