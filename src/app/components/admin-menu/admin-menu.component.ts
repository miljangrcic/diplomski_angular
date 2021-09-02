import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  @Output() logoutClick = new EventEmitter<void>();
  @Output() dashboardClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
