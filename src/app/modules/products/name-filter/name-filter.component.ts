import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { FilteringItem } from '../../shared/models/filtering-item';

@Component({
  selector: 'app-name-filter',
  templateUrl: './name-filter.component.html',
  styleUrls: ['./name-filter.component.css']
})
export class NameFilterComponent implements OnInit {

  nameFormControl = new FormControl();
  @Output() inputChanged = new EventEmitter<FilteringItem>();

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // set inital filter state
    let routeSnapshot = this.activatedRoute.snapshot.queryParamMap;
    this.nameFormControl.setValue(routeSnapshot.get("naziv"));
    
    this.listenForInputChanges();
  }

  private listenForInputChanges() {
    this.nameFormControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),

    ).subscribe(filterValue => this.emitFilterValue(filterValue))
  }

  emitFilterValue(filterValue: string[]) {
    let filterItem : FilteringItem = {filterName: "naziv", filterValues: filterValue}
    this.inputChanged.emit(filterItem);

  }




  

}
