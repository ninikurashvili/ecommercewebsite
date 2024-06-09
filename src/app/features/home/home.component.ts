import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { tap } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { ConvertpricePipe } from '../../shared/pipes/convertprice.pipe';
import { RouterLink } from '@angular/router';
import { ProductDisplayComponent } from '../../shared/ui';
import { Product } from '../../shared/interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, ProductDisplayComponent, ConvertpricePipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent implements OnInit {
  private readonly productService = inject(ProductService);
  readonly products: Product[] = [];

  readonly apple: Product[] = [];
  readonly oppo: Product[] = [];
  readonly samsung: Product[] = [];
  readonly realme: Product[] = [];
  readonly vivo: Product[] = [];

  brands = [
    { name: 'Apple', products: this.apple },
    { name: 'Samsung', products: this.samsung },
    { name: 'Realme', products: this.realme },
    { name: 'Vivo', products: this.vivo },
    { name: 'Oppo', products: this.oppo },
  ];
  ngOnInit(): void {
    this.productService
      .getByCategory('smartphones')
      .pipe(
        tap((response) => {
          response.products.forEach((product) => {
            if (product.id != 126) {
              this.products.push(product);
            }
          });
        }),
      )
      .subscribe();

    this.productService
      .getByCategory('laptops')
      .pipe(
        tap((response) => {
          response.products.forEach((product) => {
            if (product.id != 126) {
              this.products.push(product);
            }
          });
        }),
      )
      .subscribe();
    this.productService
      .getByCategory('tablets')
      .pipe(
        tap((response) => {
          response.products.forEach((product) => {
            if (product.id != 126) {
              this.products.push(product);
            }
          });
        }),
      )
      .subscribe();
    this.productService
      .getByCategory('mobile-Accessories')
      .pipe(
        tap((response) => {
          response.products.forEach((product) => {
            if (product.id != 126) {
              this.products.push(product);
            }
          });
        }),
      )
      .subscribe();
    this.productService
      .getByBrands('Apple')
      .pipe(
        tap((response) => {
          response.products.forEach((product) => {
            if (
              product.id != 126 &&
              (product.tags.includes('smartphones') ||
                product.tags.includes('laptops') ||
                product.tags.includes('tablets') ||
                product.tags.includes('electronics'))
            ) {
              this.apple.push(product);
            }
          });
        }),
      )
      .subscribe();
    this.productService
      .getByBrands('Samsung')
      .pipe(
        tap((response) => {
          response.products.forEach((product) => {
            if (
              product.id != 126 &&
              (product.tags.includes('smartphones') ||
                product.tags.includes('laptops') ||
                product.tags.includes('tablets') ||
                product.tags.includes('electronics'))
            ) {
              this.samsung.push(product);
            }
          });
        }),
      )
      .subscribe();
    this.productService
      .getByBrands('Realme')
      .pipe(
        tap((response) => {
          response.products.forEach((product) => {
            if (
              product.id != 126 &&
              (product.tags.includes('smartphones') ||
                product.tags.includes('laptops') ||
                product.tags.includes('tablets') ||
                product.tags.includes('electronics'))
            ) {
              this.realme.push(product);
            }
          });
        }),
      )
      .subscribe();

    this.productService
      .getByBrands('Vivo')
      .pipe(
        tap((response) => {
          response.products.forEach((product) => {
            if (
              product.id != 126 &&
              (product.tags.includes('smartphones') ||
                product.tags.includes('laptops') ||
                product.tags.includes('tablets') ||
                product.tags.includes('electronics'))
            ) {
              this.vivo.push(product);
            }
          });
        }),
      )
      .subscribe();
    this.productService
      .getByBrands('Oppo')
      .pipe(
        tap((response) => {
          response.products.forEach((product) => {
            if (
              product.id != 126 &&
              (product.tags.includes('smartphones') ||
                product.tags.includes('laptops') ||
                product.tags.includes('tablets') ||
                product.tags.includes('electronics'))
            ) {
              this.oppo.push(product);
            }
          });
        }),
      )
      .subscribe();
  }

  trackById(index: number, product: any): any {
    return product.id;
  }
}
