import { HttpClient, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategorySimpleDto } from '../modules/shared/models/category-simple-dto';
import { PackagingMaterialSimpleDto } from '../modules/shared/models/packaging-material-simple-dto';
import { ProductFullDto } from '../modules/shared/models/product-full-dto';
import { ProductSimpleDto } from '../modules/shared/models/product-simple-dto';
import { VolumeSimpleDto } from '../modules/shared/models/volume-simple-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(queryParams: any) : Observable<ProductSimpleDto[]> {
    const url = `${environment.API_BASE_URL}/products`;
    return this.http.get<ProductSimpleDto[]>(url, {params: queryParams});
  }

  getProductsByID(productID: number) : Observable<ProductFullDto> {
    const url = `${environment.API_BASE_URL}/products/${productID}`;
    return this.http.get<ProductFullDto>(url);
  }

  createProduct(productToAdd: FormData) : Observable<HttpResponse<any>> {
    const url = `${environment.API_BASE_URL}/products`;
    return this.http.post(url, productToAdd, {observe: 'response'});
  }

  updateProduct(productID: number, updatedProduct: FormData) : Observable<HttpResponse<any>> {
    const url = `${environment.API_BASE_URL}/products/${productID}`;
    return this.http.put(url, updatedProduct, {observe: 'response'});
  }

  deleteProduct(productID: number) : Observable<HttpResponse<any>> {
    const url = `${environment.API_BASE_URL}/products/${productID}`;
    return this.http.delete(url, {observe: 'response'});
  }
  
  getAllVolumes() : Observable<VolumeSimpleDto[]>{
    const url = `${environment.API_BASE_URL}/products/volumes`;
    return this.http.get<VolumeSimpleDto[]>(url);
  }

  getAllPackagingMaterials() : Observable<PackagingMaterialSimpleDto[]> {
    const url = `${environment.API_BASE_URL}/products/packagingmaterials`;
    return this.http.get<PackagingMaterialSimpleDto[]>(url);
  }

  getAllCategories() : Observable<CategorySimpleDto[]> {
    const url = `${environment.API_BASE_URL}/products/categories`;
    return this.http.get<CategorySimpleDto[]>(url)
  }
}
