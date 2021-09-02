import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManufacturerDetailsComponent } from './manufacturer-details/manufacturer-details.component';
import { ManufacturerListComponent } from './manufacturer-list/manufacturer-list.component';


const routes: Routes = [
  {path: '', component: ManufacturerListComponent},
  {path: ':id', component: ManufacturerDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturersRoutingModule { }
