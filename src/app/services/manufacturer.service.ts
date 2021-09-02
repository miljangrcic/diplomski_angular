import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { onErrorResumeNextStatic } from 'rxjs/internal/operators/onErrorResumeNext';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ManufacturerFullDto } from '../modules/shared/models/manufacturer-full-dto';
import { ManufacturerSimpleDto } from '../modules/shared/models/manufacturer-simple-dto';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {


  constructor(private http: HttpClient) { }


  public getAllManufacturers() : Observable<ManufacturerSimpleDto[]> {
    const url = `${environment.API_BASE_URL}/manufacturers`;
    return this.http.get<ManufacturerSimpleDto[]>(url);
  }


  public getManufacturerByID(manufacturerID: number) : Observable<ManufacturerFullDto> {
    const url = `${environment.API_BASE_URL}/manufacturers/${manufacturerID}`;
    return this.http.get<ManufacturerFullDto>(url);
  }

  public createManufacturer(manufacturerToAdd: FormData) : Observable<HttpResponse<any>> {
    const url = `${environment.API_BASE_URL}/manufacturers`;
    return this.http.post<HttpResponse<any>>(url, manufacturerToAdd, {observe: 'response'});
  }


  public updateManfacturer(manufacturerID: number, updatedManufacturer: FormData) : Observable<HttpResponse<any>> {
    const url = `${environment.API_BASE_URL}/manufacturers/${manufacturerID}`;
    return this.http.put<HttpResponse<any>>(url, updatedManufacturer, {observe: 'response'});
  }


  public deleteManufacturerByID(manufacturerID: number) : Observable<HttpResponse<any>> {
    let url = `${environment.API_BASE_URL}/manufacturers/${manufacturerID}`;
    return this.http.delete<HttpResponse<any>>(url, {observe: 'response'});
  }


}
