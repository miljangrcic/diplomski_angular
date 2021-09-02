import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { ManufacturerSimpleDto } from '../../shared/models/manufacturer-simple-dto';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.css']
})
export class ManufacturerListComponent implements OnInit {

  manufacturers$: Observable<ManufacturerSimpleDto[]>;

  constructor(
    private manufacturerService: ManufacturerService,
    private router: Router
    ) { }

  ngOnInit() {
    this.manufacturers$ = this.manufacturerService.getAllManufacturers();
  }

  manufacturerClick(manufacturerID: number) {
    this.router.navigate(['proizvodjaci', manufacturerID]);
  }

}
