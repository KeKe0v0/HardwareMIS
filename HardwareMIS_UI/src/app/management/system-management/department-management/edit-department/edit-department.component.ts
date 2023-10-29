import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DialogService } from 'ng-devui';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss'],
})
export class EditDepartmentComponent implements OnInit {
  @ViewChild('selectStaff', { static: true })
  selectStaff: TemplateRef<any>;

  @Input() selectDepartmentId: string;
  @Output() selectedStaffIdEvent = new EventEmitter<string>();

  staffId = '';
  selectedStaffId = '';

  constructor(private dialogService: DialogService) {}

  ngOnInit() {}

  openSelectStaff() {
    const results = this.dialogService.open({
      id: 'select-staff-dialog',
      width: '80dvi',
      title: '选择员工',
      contentTemplate: this.selectStaff,
      backdropCloseable: false,
      buttons: [
        {
          cssClass: 'primary',
          text: '确定',
          handler: ($event: Event) => {
            this.staffId = this.selectedStaffId;
            this.selectedStaffIdEvent.emit(this.selectedStaffId);
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

  selectedStaff(selectedStaffIdEvent: string) {
    this.selectedStaffId = selectedStaffIdEvent;
  }
}
