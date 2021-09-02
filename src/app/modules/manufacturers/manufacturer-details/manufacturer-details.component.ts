import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';   
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { ManufacturerFullDto } from '../../shared/models/manufacturer-full-dto';

@Component({
  selector: 'app-manufacturer-details',
  templateUrl: './manufacturer-details.component.html',
  styleUrls: ['./manufacturer-details.component.css']
})
export class ManufacturerDetailsComponent implements OnInit {

  manufacturer$: Observable<ManufacturerFullDto>;

  constructor(
    private manufacturerService: ManufacturerService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.manufacturer$ = this.route.paramMap.pipe(
      switchMap(
        (params : ParamMap) => this.manufacturerService.getManufacturerByID(+params.get('id')) 
      )
    )

  }

}
