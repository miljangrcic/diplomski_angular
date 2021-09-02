import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { ProductFullDto } from '../../shared/models/product-full-dto';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product$: Observable<ProductFullDto>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
    ) { }

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => this.productService.getProductsByID(+params.get('id')))
    )
  }

}
