import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private notificationService: NotificationService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req)
                .pipe(
                  catchError( (error : HttpErrorResponse) => this.errorHandler(error) )
                )
  }

  private errorHandler(errorResponse: HttpErrorResponse) {
    if(errorResponse.status == 401) {
      this.notificationService.emitError("Nemate odgovarajuće kredencijale");
      this.router.navigate(['login']);
    }

    if(errorResponse.error) {
      this.notificationService.emitError(errorResponse.error)
    }
      
    return throwError(errorResponse.message || "Server error")
  }

}

