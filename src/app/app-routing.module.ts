import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  { path: "", redirectTo: "dobrodosli", pathMatch: "full"},
  { path: "dobrodosli", component: WelcomeComponent},
  { path: "proizvodi", loadChildren: () => import("./modules/products/products.module").then(m => m.ProductsModule)},
  { path: "proizvodjaci", loadChildren: () => import("./modules/manufacturers/manufacturers.module").then(m => m.ManufacturersModule)},
  { path: "admin", loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule), canActivate: [AdminGuard]},
  { path: "login", loadChildren: () => import("./modules/login/login.module").then(m => m.LoginModule)},
  { path: "**", redirectTo: "nije-pronadjeno"},
  { path: "nije-pronadjeno", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
