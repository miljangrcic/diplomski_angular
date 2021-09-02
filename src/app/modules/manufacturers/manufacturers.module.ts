import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufacturersRoutingModule } from './manufacturers-routing.module';
import { ManufacturerListComponent } from './manufacturer-list/manufacturer-list.component';
import { SharedModule } from '../shared/shared.module';
import { ManufacturerDetailsComponent } from './manufacturer-details/manufacturer-details.component';


@NgModule({
  declarations: [ManufacturerListComponent, ManufacturerDetailsComponent],
  imports: [
    CommonModule,
    ManufacturersRoutingModule,
    SharedModule
  ]
})
export class ManufacturersModule { }
