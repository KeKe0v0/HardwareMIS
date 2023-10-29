import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleManagementComponent } from './sale-management/sale-management.component';
import { InventoryManagementComponent } from './inventory-management/inventory-management.component';
import { PurchasingManagementComponent } from './purchasing-management/purchasing-management.component';
import { LogisticsManagementComponent } from './logistics-management/logistics-management.component';
import { SystemManagementComponent } from './system-management/system-management.component';

const routes: Routes = [
  { path: 'sale-management', component: SaleManagementComponent },
  { path: 'inventory-management', component: InventoryManagementComponent },
  { path: 'purchasing-management', component: PurchasingManagementComponent },
  { path: 'logistics-management', component: LogisticsManagementComponent },
  { path: 'system-management', component: SystemManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
