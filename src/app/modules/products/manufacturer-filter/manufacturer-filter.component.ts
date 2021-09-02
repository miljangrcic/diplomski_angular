import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ManufacturerSimpleDto } from '../../shared/models/manufacturer-simple-dto';

@Component({
  selector: 'app-manufacturer-filter',
  templateUrl: './manufacturer-filter.component.html',
  styleUrls: ['./manufacturer-filter.component.css']
})
export class ManufacturerFilterComponent implements OnInit  {

  @Input() manufacturers: ManufacturerSimpleDto[];
  selectedManufacturers: string[] = [];
  @Output() selectedManufacturersChange = new EventEmitter<string[]>();

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // sets initial state of filters
    let routeSnapshot = this.activatedRoute.snapshot.queryParamMap;
    this.selectedManufacturers = routeSnapshot.getAll('proizvodjac');
  }

  onCheckboxValueChange(isChecked: boolean, value: string) {

    this.selectedManufacturers = isChecked 
      ? [...this.selectedManufacturers, value]
      : this.selectedManufacturers.filter(x => x != value);

    this.selectedManufacturersChange.emit(this.selectedManufacturers);
  }

}
