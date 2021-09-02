
import { EventEmitter, Input, Output } from '@angular/core';
import { Component} from '@angular/core';
import { ProductSimpleDto } from '../../shared/models/product-simple-dto';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  @Input() products: ProductSimpleDto[];
  @Output() productClick = new EventEmitter<number>();

  constructor() { }
}
