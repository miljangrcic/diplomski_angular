import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, Subscription, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { ProductService } from 'src/app/services/product.service';
import { FilteringItem } from '../../shared/models/filtering-item';
import { ManufacturerSimpleDto } from '../../shared/models/manufacturer-simple-dto';
import { PackagingMaterialSimpleDto } from '../../shared/models/packaging-material-simple-dto';
import { ProductSimpleDto } from '../../shared/models/product-simple-dto';
import { VolumeSimpleDto } from '../../shared/models/volume-simple-dto';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$ : Observable<ProductSimpleDto[]>;
  sideFiltersData$ : Observable<[ManufacturerSimpleDto[], VolumeSimpleDto[], PackagingMaterialSimpleDto[]]>;


  constructor(
    private productService: ProductService,
    private manufacturerService: ManufacturerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.loadSideFiltersData();
    this.filterProductsOnChangingQueryParams();
  }

  loadSideFiltersData() {
    this.sideFiltersData$ = forkJoin(
      this.manufacturerService.getAllManufacturers(),
      this.productService.getAllVolumes(),
      this.productService.getAllPackagingMaterials()
    )
  }

  filterProductsOnChangingQueryParams() {
    this.products$ = this.activatedRoute.queryParams.pipe(
      switchMap(queryParams => this.productService.getProducts(queryParams))
    )
  }

  onProductClick(productID: number) {
    this.router.navigate(['./', productID],{relativeTo: this.activatedRoute}); // go to product details
  }

  handleFilterChange(filteringItem: FilteringItem) {
    let param = this.generateQueryParam(filteringItem);
    this.changeQueryParamOfCurrentRoute(param);
  }


  private changeQueryParamOfCurrentRoute(param: any) {
    this.router.navigate([], {queryParams: param, queryParamsHandling: "merge"})

  }

  private generateQueryParam(filteringItem : FilteringItem) {
    let key = filteringItem.filterName;
    let values = filteringItem.filterValues;
    let queryParam : any = {
      [key]: values.length ? values : null
    };
    return queryParam;
  }

  restartFilters() {
    this.router.navigate([]);
  }


}
