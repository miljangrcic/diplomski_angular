import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatSidenavModule, MatTableModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { AdminManufacturerListComponent } from './admin-manufacturer-list/admin-manufacturer-list.component';
import { ManufacturerFormComponent } from './manufacturer-form/manufacturer-form.component';
import { AdminProductListComponent } from './admin-product-list/admin-product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent, 
    AdminManufacturerListComponent, 
    ManufacturerFormComponent, 
    AdminProductListComponent, 
    ProductFormComponent, 
    ImageUploaderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatTableModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class AdminModule { }
