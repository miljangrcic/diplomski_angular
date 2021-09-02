import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminManufacturerListComponent } from './admin-manufacturer-list/admin-manufacturer-list.component';
import { AdminProductListComponent } from './admin-product-list/admin-product-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManufacturerFormComponent } from './manufacturer-form/manufacturer-form.component';
import { ProductFormComponent } from './product-form/product-form.component';


const routes: Routes = [
  { path: "", component: DashboardComponent,
    children: [
        { path: "", redirectTo: "proizvodjaci", pathMatch:"full"},
        { path: "proizvodjaci/dodaj", component: ManufacturerFormComponent},
        { path: "proizvodjaci/:id", component: ManufacturerFormComponent},
        { path: "proizvodjaci", component: AdminManufacturerListComponent},
        { path: "proizvodi", component: AdminProductListComponent},
        { path: "proizvodi/:id", component: ProductFormComponent}
    ]
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
