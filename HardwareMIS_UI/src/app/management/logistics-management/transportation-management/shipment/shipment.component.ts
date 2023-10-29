import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss'],
})
export class ShipmentComponent implements OnInit {
  constructor() {}

  @Output() changeValueEvent = new EventEmitter<string>();

  trackingNumber: string;

  ngOnInit() {}

  changeValue() {
    this.changeValueEvent.emit(this.trackingNumber);
  }
}
