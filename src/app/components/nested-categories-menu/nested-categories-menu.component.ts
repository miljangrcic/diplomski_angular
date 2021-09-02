import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material';
import { CategoryMenuItem } from 'src/app/modules/shared/models/category-menu-item';

@Component({
  selector: 'app-nested-categories-menu',
  templateUrl: './nested-categories-menu.component.html',
  styleUrls: ['./nested-categories-menu.component.css']
})
export class NestedCategoriesMenuComponent implements OnInit {

  @ViewChild("menu", {static: true}) menu : MatMenu;
  @Input() menuItems : CategoryMenuItem[];

  constructor() { }

  ngOnInit() {
  }

}
