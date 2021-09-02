import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ManufacturerFilterComponent } from './manufacturer-filter/manufacturer-filter.component';
import { MatCheckboxModule, MatExpansionModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { VolumeFilterComponent } from './volume-filter/volume-filter.component';
import { PackageMaterialFilterComponent } from './package-material-filter/package-material-filter.component';
import { NameFilterComponent } from './name-filter/name-filter.component';
import { ProductSideFiltersComponent } from './product-side-filters/product-side-filters.component';
import { ProductsComponent } from './products/products.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent, 
    ProductDetailsComponent,
    ProductSideFiltersComponent,
    ManufacturerFilterComponent, 
    VolumeFilterComponent, 
    PackageMaterialFilterComponent, 
    NameFilterComponent, 
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ProductsModule { }
