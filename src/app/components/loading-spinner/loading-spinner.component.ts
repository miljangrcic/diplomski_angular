import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {


  isLoading$: Observable<boolean>;

  constructor(
    public loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.isLoading$ = this.loadingSpinnerService.isLoading$;
  }

}
