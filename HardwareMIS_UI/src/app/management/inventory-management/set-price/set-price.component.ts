import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-set-price',
  templateUrl: './set-price.component.html',
  styleUrls: ['./set-price.component.scss'],
})
export class SetPriceComponent implements OnInit {
  @ViewChild('selectHardware', { static: true })
  selectHardware: TemplateRef<any>;
  @Output() changeValueEvent = new EventEmitter<string>();

  price: number;
  unit: string;

  ngOnInit() {}

  changeValue() {
    const event = {
      price: this.price,
      unit: this.unit,
    };
    this.changeValueEvent.emit(JSON.stringify(event));
  }
}
