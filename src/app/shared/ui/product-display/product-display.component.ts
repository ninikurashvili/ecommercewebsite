import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  NgModule,
  Output,
} from '@angular/core';
import { Product } from '../../interfaces';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConvertpricePipe } from '../../pipes/convertprice.pipe';
import { ProductService } from '../../services/product.service';
import { SharedService } from '../../services/shared.service';
import { AddtocartDirective } from '../../directives/addtocart.directive';

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, ConvertpricePipe,AddtocartDirective],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.scss',
})
export class ProductDisplayComponent {
  @Input() productToDisplay: Product | null = null;
  @Input() index: number | null = null;
  @Output() inCart = new EventEmitter<number>();

  constructor(private sharedService: SharedService) {}

  addToCart() {
    if (this.productToDisplay && this.productToDisplay.id) {
      this.sharedService.addProductId(this.productToDisplay.id);
      this.inCart.emit(this.productToDisplay.id); 
    } else {
      console.error('productToDisplay or its id is null or undefined.');
    }
  }
  calculateDiscountedPrice(price: number, discountPercentage: number) {
    return Number((price - (price * discountPercentage) / 100).toFixed(2));
  }
}
