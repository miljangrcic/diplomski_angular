import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/modules/shared/models/notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifications$.subscribe(notification => {

      if(!notification.isError()) {
        this.autoRemoval(notification);
      }

      this.notifications.push(notification);
      
    })
  }

  autoRemoval(notificationToRemove: Notification) {
    setTimeout(() => {
      this.removeNotification(notificationToRemove);
    }, 3000)
  }

  removeNotification(notificationToRemove : Notification) {
    let index = this.notifications.findIndex(notification => notification == notificationToRemove);
    this.notifications.splice(index, 1);
  }

}
