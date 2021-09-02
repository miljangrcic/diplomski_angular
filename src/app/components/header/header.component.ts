import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryMenuItem } from 'src/app/modules/shared/models/category-menu-item';
import { CategorySimpleDto } from 'src/app/modules/shared/models/category-simple-dto';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public categoryMenuItems: CategoryMenuItem[] = [];
  public isLoggedIn$: Observable<boolean>;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.productService.getAllCategories().subscribe(categories => this.generateCategoryMenuItems(categories));
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['dobrodosli'])
  }

  onDashboardClick() {
    this.router.navigate(['admin']);
  }

  generateCategoryMenuItems(categories: CategorySimpleDto[]) {
    this.categoryMenuItems = this.buildMenuTree(0, categories);
    this.categoryMenuItems.push({displayValue: "Svi proizvodi", queryParamValue: null, subitems: []}) 
  }

  buildMenuTree(categoryID: number, categories: CategorySimpleDto[]) {
    let menuItems : CategoryMenuItem[] = [];

    for(let c of categories) {
      if(categoryID == c.parentCategoryID) {
        let subitem = new CategoryMenuItem(c.name, c.name);
        subitem.subitems = this.buildMenuTree(c.categoryID, categories);
        menuItems.push(subitem);
      }
    }

    return menuItems;
  }
}
