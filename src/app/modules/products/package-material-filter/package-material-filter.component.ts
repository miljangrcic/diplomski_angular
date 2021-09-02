import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PackagingMaterialSimpleDto } from '../../shared/models/packaging-material-simple-dto';

@Component({
  selector: 'app-package-material-filter',
  templateUrl: './package-material-filter.component.html',
  styleUrls: ['./package-material-filter.component.css']
})
export class PackageMaterialFilterComponent implements OnInit{

  @Input() packagingMaterials: PackagingMaterialSimpleDto[];
  selectedPackagingMaterials : string[] = [];
  @Output() selectedPackagingMaterialsChange = new EventEmitter<string[]>()


  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // sets initial filter state
    let routeSnapshot = this.activatedRoute.snapshot.queryParamMap;
    this.selectedPackagingMaterials = routeSnapshot.getAll("ambalaza");
  }

  onCheckboxChange(isChecked: boolean, value: string) {

    this.selectedPackagingMaterials = isChecked 
      ? [...this.selectedPackagingMaterials, value]
      : this.selectedPackagingMaterials.filter(packageMaterial => packageMaterial != value)

    this.selectedPackagingMaterialsChange.emit(this.selectedPackagingMaterials);
    
  }

}
