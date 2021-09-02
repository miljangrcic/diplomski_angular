import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Notification, NotificationType } from '../modules/shared/models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject : Subject<Notification> = new Subject<Notification>();


  public get notifications$() : Observable<Notification> { 
    return this.notificationSubject.asObservable()
  };


  public emitSuccess(message: string) {
    const errorNotification = new Notification(message, new Date(), NotificationType.Success);
    this.notificationSubject.next(errorNotification);
  }


  public emitInfo(message: string) {
    const errorNotification = new Notification(message, new Date(), NotificationType.Info);
    this.notificationSubject.next(errorNotification);
  }


  public emitError(message: string) {
    const errorNotification = new Notification(message, new Date(), NotificationType.Error);
    this.notificationSubject.next(errorNotification);
  }
  

}
