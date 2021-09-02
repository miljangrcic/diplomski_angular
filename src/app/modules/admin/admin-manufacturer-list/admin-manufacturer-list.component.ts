import { Component, OnInit } from '@angular/core';
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ManufacturerSimpleDto } from '../../shared/models/manufacturer-simple-dto';

@Component({
  selector: 'app-admin-manufacturer-list',
  templateUrl: './admin-manufacturer-list.component.html',
  styleUrls: ['./admin-manufacturer-list.component.css']
})
export class AdminManufacturerListComponent implements OnInit {

  dataSource : ManufacturerSimpleDto[];
  displayedColumns = ["id", "name", "logo", "actions" ];

  constructor(
    private manufacturerService: ManufacturerService, 
    private notificationService : NotificationService
  ) { }

  ngOnInit() {
    this.manufacturerService.getAllManufacturers().subscribe(data => this.dataSource = data);
  }

  deleteManufacturer(manufacturerID: number) {

    let shouldDelete = confirm("Da li ste sigurni da želite da obrišete proizvođača?")

    if(shouldDelete) {

      this.manufacturerService.deleteManufacturerByID(manufacturerID).subscribe(response => {

        if(response.status == 204) {
          this.notificationService.emitSuccess("Uspešno ste obrisali proizvođača");
          this.removeLocaly(manufacturerID);
        }
  
      });

    }
    

  }

  removeLocaly(manufacturerID) {
    this.dataSource = this.dataSource.filter(manufacturer => manufacturer.manufacturerID != manufacturerID);
  }

}
