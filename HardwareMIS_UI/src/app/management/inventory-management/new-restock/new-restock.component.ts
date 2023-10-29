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
  selector: 'app-new-restock',
  templateUrl: './new-restock.component.html',
  styleUrls: ['./new-restock.component.scss'],
})
export class NewRestockComponent implements OnInit {
  @ViewChild('selectHardware', { static: true })
  selectHardware: TemplateRef<any>;
  @Output() changeValueEvent = new EventEmitter<string>();

  hardwareId = null;
  selectedHardwareId = null;
  restockNumber = null;

  constructor(private dialogService: DialogService) {}

  ngOnInit() {}

  changeValue() {
    const event = {
      hardwareId: this.hardwareId,
      restockNumber: this.restockNumber,
    };
    this.changeValueEvent.emit(JSON.stringify(event));
  }

  openSelectHardware() {
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
            this.hardwareId = this.selectedHardwareId;
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

  selectedHardware(selectedHardwareIdEvent: string) {
    this.selectedHardwareId = selectedHardwareIdEvent;
  }
}
