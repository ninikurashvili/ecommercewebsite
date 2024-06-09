import { SharedService } from './../../shared/services/shared.service';
import { Product } from './../../shared/interfaces/product';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Subscription, tap } from 'rxjs';
import { ProductDisplayComponent } from '../../shared/ui';
import { CartproductComponent } from '../../shared/ui/cartproduct/cartproduct.component';
import { ConvertpricePipe } from '../../shared/pipes/convertprice.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartproductComponent, ConvertpricePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export default class CartComponent implements OnInit {
  productIds: Set<number> = new Set<number>();
  products: Set<Product> = new Set<Product>();
  priceToPay = 0;
  private readonly productService = inject(ProductService);
  private readonly sharedService = inject(SharedService);

  ngOnInit() {
    this.sharedService.productIds$.subscribe((ids) => {
      this.productIds.clear();
      this.productIds = ids;
      this.updateCart();
    });

    this.sharedService.productDeleted$.subscribe((id) => {
      this.removeProductById(id);
      this.recalculatePrice();
    });
  }

  updateCart() {
    this.products.clear();
    this.priceToPay = 0;

    this.productIds.forEach((id) => {
      this.productService
        .getProductById(id.toString())
        .pipe(
          tap((product) => {
            if (product.id !== 126) {
              this.products.add(product);
              this.updatePrice(product);
            }
          }),
        )
        .subscribe();
    });
  }

  removeProductById(id: number) {
    this.products.forEach((product) => {
      if (product.id === id) {
        this.products.delete(product);
      }
    });
  }

  recalculatePrice() {
    this.priceToPay = 0;
    this.products.forEach((product) => {
      this.updatePrice(product);
    });
  }

  updatePrice(product: Product) {
    if (product.discountPercentage > 15) {
      this.priceToPay += Number(
        (
          product.price -
          (product.price * product.discountPercentage) / 100
        ).toFixed(2),
      );
    } else {
      this.priceToPay += product.price;
    }
  }
}
