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
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
  @ViewChild('selectSupplier', { static: true })
  selectSupplier: TemplateRef<any>;

  @Output() changeValueEvent = new EventEmitter<string>();

  supplierId: string = '';
  selectedSupplierId: string;
  selectedHardwareId: string;

  purchasingGroup = [
    {
      type: null,
      model: null,
      brand: null,
      purchasingPrice: null,
      pruchasingNumber: null,
    },
  ];

  purchasingGroupIndex: number;

  constructor(private dialogService: DialogService) {}

  ngOnInit() {}

  add() {
    this.purchasingGroup.push({
      type: null,
      model: null,
      brand: null,
      purchasingPrice: null,
      pruchasingNumber: null,
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
      purchasingGroup: this.purchasingGroup,
    };
    this.changeValueEvent.emit(JSON.stringify(event));
  }
}
