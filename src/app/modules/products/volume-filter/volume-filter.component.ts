import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';
import { VolumeSimpleDto } from '../../shared/models/volume-simple-dto';

@Component({
  selector: 'app-volume-filter',
  templateUrl: './volume-filter.component.html',
  styleUrls: ['./volume-filter.component.css']
})
export class VolumeFilterComponent implements OnInit {

  @Input() volumes : VolumeSimpleDto[];
  selectedVolumes: string[] = [];
  @Output() selectedVolumesChange = new EventEmitter<string[]>();

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // sets inital filter state
    let routeSnapshot = this.activatedRoute.snapshot.queryParamMap;
    this.selectedVolumes = routeSnapshot.getAll("zapremina");
  }

  
  onCheckboxChange(isChecked: boolean, value: string) {

    this.selectedVolumes = (isChecked) 
      ? [...this.selectedVolumes, value] 
      : this.selectedVolumes.filter(volume => volume != value);

    this.selectedVolumesChange.emit(this.selectedVolumes);

  }


}
