import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingSpinnerService } from '../services/loading-spinner.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerInterceptorService implements HttpInterceptor {

  constructor(private loadingSpinnerService: LoadingSpinnerService) { }

  // send signal to show loading spinner on every http request, and hide on completitions of requests
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        this.loadingSpinnerService.show();

        return next.handle(req)
            .pipe(
                finalize(() => this.loadingSpinnerService.hide())
            )
  }
}
