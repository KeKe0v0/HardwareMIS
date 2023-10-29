import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DialogService } from 'ng-devui';

@Component({
  selector: 'app-new-sale-order',
  templateUrl: './new-sale-order.component.html',
  styleUrls: ['./new-sale-order.component.scss'],
})
export class NewSaleOrderComponent implements OnInit {
  @ViewChild('selectCustomer', { static: true })
  selectCustomer: TemplateRef<any>;
  @ViewChild('selectHardware', { static: true })
  selectHardware: TemplateRef<any>;

  @Output() changeValueEvent = new EventEmitter<string>();

  customerId: string = '';
  selectedCustomerId: string;
  selectedHardwareId: string;

  saleGroup = [
    {
      hardwareId: null,
      salePrice: null,
      saleNumber: null,
    },
  ];

  saleGroupIndex: number;

  constructor(private dialogService: DialogService) {}

  ngOnInit() {}

  add() {
    this.saleGroup.push({
      hardwareId: null,
      salePrice: null,
      saleNumber: null,
    });
  }

  delete(index) {
    this.saleGroup.splice(index, 1);
  }

  openSelectCustomer() {
    const results = this.dialogService.open({
      id: 'select-customer-dialog',
      width: '80dvi',
      title: '选择客户',
      contentTemplate: this.selectCustomer,
      backdropCloseable: false,
      buttons: [
        {
          cssClass: 'primary',
          text: '确定',
          handler: ($event: Event) => {
            this.customerId = this.selectedCustomerId;
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

  openSelectHardware(index) {
    this.saleGroupIndex = index;
    const results = this.dialogService.open({
      id: 'select-hardware-dialog',
      width: '80dvi',
      title: '选择硬件',
      contentTemplate: this.selectHardware,
      backdropCloseable: false,
      buttons: [
        {
          cssClass: 'primary',
          text: '确定',
          handler: ($event: Event) => {
            this.saleGroup[this.saleGroupIndex].hardwareId =
              this.selectedHardwareId;
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

  selectedCustomer(selectedCustomerIdEvent: string) {
    this.selectedCustomerId = selectedCustomerIdEvent;
  }

  selectedHardware(selectedHardwareIdEvent: string) {
    this.selectedHardwareId = selectedHardwareIdEvent;
  }

  changeValue() {
    const event = {
      customerId: this.customerId,
      saleGroup: this.saleGroup,
    };
    this.changeValueEvent.emit(JSON.stringify(event));
  }
}
