import { Component, Input, inject } from '@angular/core';

import { Product } from '../../interfaces';
import { Title } from '@angular/platform-browser';
import { ProductService } from '../../services/product.service';
import { NgIf } from '@angular/common';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EMPTY, catchError, filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConvertpricePipe } from '../../pipes/convertprice.pipe';
import { SharedService } from '../../services/shared.service';
import { AddtocartDirective } from '../../directives/addtocart.directive';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [NgIf, ConvertpricePipe, AddtocartDirective],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss',
})
export default class SingleProductComponent {
  @Input() productToDisplay: Product | null = null;
  @Input() index: number | null = null;
  private readonly title = inject(Title);
  private readonly router = inject(Router);
  private readonly activedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  id = this.activedRoute.snapshot.params['id'];

  singleProduct: Product | null = null;

  constructor(private sharedService: SharedService) {
    console.log(this.activedRoute);
    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter((event) => event instanceof NavigationEnd),
        tap(() => {
          this.id = this.activedRoute.snapshot.params['id'];
          this.productService
            .getProductById(this.id)
            .pipe(
              tap((product) => {
                this.singleProduct = product;
                this.title.setTitle(product.title);
              }),
              catchError(() => {
                setTimeout(() => {
                  this.router.navigateByUrl('/products');
                }, 5000);
                return EMPTY;
              }),
            )
            .subscribe();
        }),
      )
      .subscribe();
  }

  addToCart() {
    if (this.singleProduct && this.singleProduct.id) {
      this.sharedService.addProductId(this.singleProduct.id);
    } else {
      console.error('productToDisplay or its id is null or undefined.');
    }
  }
  calculateDiscountedPrice(price: number, discountPercentage: number) {
    return Number((price - (price * discountPercentage) / 100).toFixed(2));
  }
}
