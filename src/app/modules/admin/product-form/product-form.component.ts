import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { CategorySimpleDto } from '../../shared/models/category-simple-dto';
import { ManufacturerSimpleDto } from '../../shared/models/manufacturer-simple-dto';
import { PackagingMaterialSimpleDto } from '../../shared/models/packaging-material-simple-dto';
import { ProductFullDto } from '../../shared/models/product-full-dto';
import { VolumeSimpleDto } from '../../shared/models/volume-simple-dto';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {


  productID: number; // if present - form will be populated with product data and then updated on submit, else - 
  productForm: FormGroup;
  productImageURL: string;
  categories: Observable<CategorySimpleDto[]>;
  manufacturers: Observable<ManufacturerSimpleDto[]>;
  volumes: Observable<VolumeSimpleDto[]>;
  packagingMaterials: Observable<PackagingMaterialSimpleDto[]>;


  constructor(
    private formBuilder : FormBuilder,
    private productService: ProductService,
    private manufacturerService: ManufacturerService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.initializeProductForm();
    this.loadSelectInputsData();
    this.trySetProductID();

    if(this.productID) {
      this.productService.getProductsByID(this.productID).subscribe(data => this.populateForm(data));
    }
  }


  initializeProductForm() : void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      eanCode: ['', [Validators.maxLength(13)]],
      productImage: [null, Validators.required],
      description: '',
      price: ['', Validators.required],
      categoryID: ['', Validators.required],
      manufacturerID: ['', Validators.required],
      volumeID: ['', Validators.required],
      packagingMaterialID: ['', Validators.required] 
    });
  }

  loadSelectInputsData() {
    this.categories = this.productService.getAllCategories();
    this.manufacturers = this.manufacturerService.getAllManufacturers();
    this.volumes = this.productService.getAllVolumes();
    this.packagingMaterials = this.productService.getAllPackagingMaterials();
  }

  trySetProductID() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id != null)
      this.productID = +id;
  }

  populateForm(product: ProductFullDto) {
    this.name.setValue(product.name);
    this.eanCode.setValue(product.eanCode);
    this.description.setValue(product.description);
    this.price.setValue(product.price);
    this.categoryID.setValue(product.categoryID);
    this.manufacturerID.setValue(product.manufacturerID);
    this.volumeID.setValue(product.volumeID);
    this.packagingMaterialID.setValue(product.packagingMaterialID);
    this.productImageURL = product.imageURL;
    this.productImage.clearValidators();
    this.productImage.updateValueAndValidity();
  }



  setNewProductImage(file: File) {
    this.productImage.setValue(file);
  }

  onSubmit() {
    const formData = this.generateFormData();
    if(this.productID) {
      this.updateProduct(this.productID, formData);
    } else {
      this.createProduct(formData);
    }
  }

  generateFormData() : FormData {
    let formData = new FormData();
    formData.set("name", this.name.value);
    formData.set("eanCode", this.eanCode.value);
    formData.set("productImage", this.productImage.value);
    formData.set("description", this.description.value);
    formData.set("price", this.price.value);
    formData.set("categoryID", this.categoryID.value);
    formData.set("manufacturerID", this.manufacturerID.value);
    formData.set("volumeID", this.volumeID.value);
    formData.set("packagingMaterialID", this.packagingMaterialID.value);
    return formData;
  }

  updateProduct(productID: number, updatedProduct: FormData) : void {
    this.productService.updateProduct(productID, updatedProduct)
      .subscribe(response => {
        if(response.status == 204) {
          this.notificationService.emitSuccess("Uspešno ste izmenili proizvod")
          this.backToProductList();
        }
      })
  }

  createProduct(productToBeCreated: FormData) {
    this.productService.createProduct(productToBeCreated)
      .subscribe(response => {
        if(response.status == 201) {
          this.notificationService.emitSuccess("Uspešno ste dodali proizvod");
          this.backToProductList();
        }
      })
  }


  backToProductList() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }


  get name() {return this.productForm.controls['name']};
  get eanCode() {return this.productForm.controls['eanCode']};
  get productImage() {return this.productForm.controls['productImage']};
  get description() { return this.productForm.controls['description']};
  get price() {return this.productForm.controls['price']};
  get categoryID() {return this.productForm.controls['categoryID']};
  get manufacturerID() {return this.productForm.controls['manufacturerID']}
  get volumeID() {return this.productForm.controls['volumeID']};
  get packagingMaterialID() {return this.productForm.controls['packagingMaterialID']};
}
