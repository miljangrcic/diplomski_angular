import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductSimpleDto } from '../../shared/models/product-simple-dto';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})

export class AdminProductListComponent implements OnInit {
  dataSource : ProductSimpleDto[];
  displayedColumns = ["id", "name", "image", "actions" ];

  constructor(
    private productService: ProductService, 
    private notificationService : NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.getProducts(null).subscribe(data => this.dataSource = data);
  }

  deleteProduct(productID: number) { 
    var isConfirmed = confirm("Da li ste sigurni da zelite da obrišete proizvod?");
    if(isConfirmed)
      this.productService.deleteProduct(productID).subscribe(response => {
        console.log(response);
        if(response.status == 204) {
          this.notificationService.emitSuccess("Uspešno ste obrisali proizvod");
          this.removeProductFromDataSource(productID);
        }
      })
  }

  removeProductFromDataSource(productID: number) {
    this.dataSource = this.dataSource.filter(product => product.productID != productID);
  }

    

}
