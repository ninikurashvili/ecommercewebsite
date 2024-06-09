import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces';
import { ConvertpricePipe } from '../../pipes/convertprice.pipe';
import { SharedService } from '../../services/shared.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cartproduct',
  standalone: true,
  imports: [ConvertpricePipe,RouterLink],
  templateUrl: './cartproduct.component.html',
  styleUrl: './cartproduct.component.scss',
})
export class CartproductComponent {
  @Input() productOfCart: Product | null = null;
  constructor(private sharedService: SharedService) {}

  removeFromCart() {
    if (this.productOfCart && this.productOfCart.id) {
      this.sharedService.deleteProductId(this.productOfCart.id);
    }
  }
  calculateDiscountedPrice(price: number, discountPercentage: number) {
    return Number((price - (price * discountPercentage) / 100).toFixed(2));
  }
}
