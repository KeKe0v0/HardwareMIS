import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logistics-management',
  templateUrl: './logistics-management.component.html',
  styleUrls: ['./logistics-management.component.scss'],
})
export class LogisticsManagementComponent implements OnInit {
  showTab = 'TransportationManagement';

  constructor() {}

  ngOnInit() {}
}
