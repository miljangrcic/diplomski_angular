import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ManufacturerFullDto } from '../../shared/models/manufacturer-full-dto';

@Component({
  selector: 'app-manufacturer-form',
  templateUrl: './manufacturer-form.component.html',
  styleUrls: ['./manufacturer-form.component.css']
})
export class ManufacturerFormComponent implements OnInit {

  manufacturerID : number;
  logoURL : string = '';
  bannerURL: string = '';
  manufacturerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private manufacturerService: ManufacturerService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.setIDFromURL();

    if(this.manufacturerID) {

      this.manufacturerService
        .getManufacturerByID(this.manufacturerID)
          .subscribe(
            manufacturer => this.populateForm(manufacturer)
          );

    }

  }


  initializeForm() : void {
    this.manufacturerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(50)]], 
      email: ['', [Validators.required,  Validators.maxLength(50)]], 
      phone: ['', [Validators.required, Validators.maxLength(50)]], 
      logoImageFile: [null, Validators.required],
      bannerImageFile: [null, Validators.required],
      description: [''],
      fax: ['', Validators.maxLength(50)], 
      website: ['', Validators.maxLength(50)] 
    })
  }

  setIDFromURL() : void {
    this.manufacturerID = +this.route.snapshot.paramMap.get('id');
  }


  populateForm(manufacturer: ManufacturerFullDto) : void {
    this.name.setValue(manufacturer.name);
    this.description.setValue(manufacturer.description);
    this.logoURL = manufacturer.logoURL;
    this.logoImageFile.setValidators(null);
    this.logoImageFile.updateValueAndValidity();
    this.bannerURL = manufacturer.bannerURL;
    this.bannerImageFile.setValidators(null);
    this.bannerImageFile.updateValueAndValidity();
    this.phone.setValue(manufacturer.phone);
    this.address.setValue(manufacturer.address);
    this.email.setValue(manufacturer.email);
    this.fax.setValue(manufacturer.fax);
    this.website.setValue(manufacturer.website);
  }

  setNewLogoImage(file: File) : void {
    this.logoImageFile.setValue(file);
  }

  setNewBannerImage(file: File) : void {
    this.bannerImageFile.setValue(file);
  }


  onSubmit() {

    let formData = this.generateFormData();

    if(this.manufacturerID) {
      this.updateManufacturer(formData);
    } else {
      this.createManufacturer(formData);
    }

  }


  generateFormData() : FormData {
    let formData = new FormData();
    formData.set("address", this.address.value);
    formData.set("description", this.description.value)
    formData.set("email",this.email.value)
    formData.set("fax", this.fax.value)
    formData.set("name", this.name.value)
    formData.set("bannerImageFile", this.bannerImageFile.value)
    formData.set("logoImageFile", this.logoImageFile.value)
    formData.set("phone", this.phone.value)
    formData.set("website", this.website.value)
    return formData;
  }

  createManufacturer(manufacturerData: FormData) {
    this.manufacturerService.createManufacturer(manufacturerData).subscribe(response => {
      if(response.status == 201) {
        this.notificationService.emitSuccess("Proizvođač je uspešno kreiran");
        this.backToManufacturerList();
      }
    })

  }

  updateManufacturer(updatedManufacturer: FormData) {
    this.manufacturerService.updateManfacturer(this.manufacturerID, updatedManufacturer).subscribe( response => {
      if(response.status == 204) {
        this.notificationService.emitSuccess("Proizvođač je uspešno izmenjen");
        this.backToManufacturerList();
      }
    })

  }

  backToManufacturerList() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // getters for form controls
  get name() { return this.manufacturerForm.controls['name']}
  get description() {return this.manufacturerForm.controls['description']}
  get logoImageFile() {return this.manufacturerForm.controls['logoImageFile']}
  get bannerImageFile() {return this.manufacturerForm.controls['bannerImageFile']}
  get phone() {return this.manufacturerForm.controls['phone']}
  get address() {return this.manufacturerForm.controls['address']}
  get email() {return this.manufacturerForm.controls['email']}
  get fax() {return this.manufacturerForm.controls['fax']}
  get website() {return this.manufacturerForm.controls['website']}
}
