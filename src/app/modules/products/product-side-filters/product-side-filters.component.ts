import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilteringItem } from '../../shared/models/filtering-item';
import { ManufacturerSimpleDto } from '../../shared/models/manufacturer-simple-dto';
import { PackagingMaterialSimpleDto } from '../../shared/models/packaging-material-simple-dto';
import { VolumeSimpleDto } from '../../shared/models/volume-simple-dto';


@Component({
  selector: 'app-product-side-filters',
  templateUrl: './product-side-filters.component.html',
  styleUrls: ['./product-side-filters.component.css']
})
export class ProductSideFiltersComponent {
  
  @Input() filtersData : [ManufacturerSimpleDto[], VolumeSimpleDto[], PackagingMaterialSimpleDto[]]
  @Output() sideFiltersChange = new EventEmitter<FilteringItem>();


  onSelectedManufacturersChange(selectedManufacturers : string[]) {
    let filteringItem : FilteringItem = {filterName: "proizvodjac", filterValues: selectedManufacturers}
    this.sideFiltersChange.emit(filteringItem);
  }

  onSelectedVolumesChange(selectedVolumes: []) {
    let filteringItem : FilteringItem = {filterName: "zapremina", filterValues: selectedVolumes};
    this.sideFiltersChange.emit(filteringItem);
  }

  onSelectedPackagingMaterialsChange(selectedPackagingMaterials: string[]) {
    let filteringItem : FilteringItem = {filterName: "ambalaza", filterValues: selectedPackagingMaterials};
    this.sideFiltersChange.emit(filteringItem);
  }

}
