import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-management',
  templateUrl: './system-management.component.html',
  styleUrls: ['./system-management.component.scss'],
})
export class SystemManagementComponent implements OnInit {
  showTab = 'DepartmentManagement';
  constructor() {}

  ngOnInit() {}
}
