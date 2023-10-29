import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ManagementComponent } from './management.component';
import { ManagementRoutingModule } from './management-routing.module';
import { SaleManagementComponent } from './sale-management/sale-management.component';
import { NewSaleOrderComponent } from './sale-management/new-sale-order/new-sale-order.component';
import { SaleDetailComponent } from './sale-management/sale-detail/sale-detail.component';
import { InventoryManagementComponent } from './inventory-management/inventory-management.component';
import { PurchasingManagementComponent } from './purchasing-management/purchasing-management.component';
import { LogisticsManagementComponent } from './logistics-management/logistics-management.component';
import { DevUIModule } from 'ng-devui';
import { TransportationManagementComponent } from './logistics-management/transportation-management/transportation-management.component';
import { ReceivingManagementComponent } from './logistics-management/receiving-management/receiving-management.component';
import { SystemManagementComponent } from './system-management/system-management.component';
import { DepartmentManagementComponent } from './system-management/department-management/department-management.component';
import { StaffManagementComponent } from './system-management/staff-management/staff-management.component';
import { EditDepartmentComponent } from './system-management/department-management/edit-department/edit-department.component';
import { SelectStaffComponent } from './system-management/department-management/select-staff/select-staff.component';
import { RestockComponent } from './inventory-management/restock/restock.component';
import { NewRestockComponent } from './inventory-management/new-restock/new-restock.component';
import { SelectCustomerComponent } from './sale-management/select-customer/select-customer.component';
import { SelectHardwareComponent } from './inventory-management/select-hardware/select-hardware.component';
import { NewProductComponent } from './purchasing-management/new-product/new-product.component';
import { SelectSupplierComponent } from './purchasing-management/select-supplier/select-supplier.component';
import { PurchasingDetailComponent } from './purchasing-management/purchasing-detail/purchasing-detail.component';
import { ShipmentComponent } from './logistics-management/transportation-management/shipment/shipment.component';
import { StockOutComponent } from './inventory-management/stock-out/stock-out.component';
import { StockInComponent } from './inventory-management/stock-in/stock-in.component';
import { SetPriceComponent } from './inventory-management/set-price/set-price.component';
import { StockoutPurchasingComponent } from './purchasing-management/stockout-purchasing/stockout-purchasing.component';

@NgModule({
  declarations: [
    ManagementComponent,
    SaleManagementComponent,
    NewSaleOrderComponent,
    SelectCustomerComponent,
    SaleDetailComponent,
    InventoryManagementComponent,
    SetPriceComponent,
    SelectHardwareComponent,
    RestockComponent,
    NewRestockComponent,
    StockOutComponent,
    StockInComponent,
    PurchasingManagementComponent,
    PurchasingDetailComponent,
    NewProductComponent,
    SelectSupplierComponent,
    StockoutPurchasingComponent,
    LogisticsManagementComponent,
    TransportationManagementComponent,
    ShipmentComponent,
    ReceivingManagementComponent,
    SystemManagementComponent,
    DepartmentManagementComponent,
    EditDepartmentComponent,
    SelectStaffComponent,
    StaffManagementComponent,
  ],
  imports: [BrowserModule, ManagementRoutingModule, DevUIModule, FormsModule],
  providers: [],
  bootstrap: [ManagementComponent],
})
export class ManagementModule {}
