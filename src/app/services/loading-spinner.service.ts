import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

  private numberOfPendingEvents = 0;

  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  get isLoading$() : Observable<boolean> { 
    return this.isLoadingSubject.asObservable() 
  };

  show() {
    this.numberOfPendingEvents++;
    this.isLoadingSubject.next(true);
  }

  hide() {
    this.numberOfPendingEvents--;
    if(this.numberOfPendingEvents == 0) {
      this.isLoadingSubject.next(false);
    }
  }
}
