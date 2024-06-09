import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EMPTY, Subject } from 'rxjs';
import { catchError, filter, tap, takeUntil } from 'rxjs/operators';
import { ProductService } from '../../shared/services/product.service';
import {
  ProductDisplayComponent,
  ProductFilterComponent,
} from '../../shared/ui';
import { Product } from '../../shared/interfaces';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-productsort-filter',
  standalone: true,
  imports: [
    ProductDisplayComponent,
    ProductFilterComponent,
    FormsModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './productsort-filter.component.html',
  styleUrls: ['./productsort-filter.component.scss'],
})
export default class ProductsortFilterComponent implements OnInit, OnDestroy {
  private readonly title = inject(Title);
  private readonly router = inject(Router);
  private readonly activedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  private destroy$ = new Subject<void>();

  selectedBrand: string | null = null;
  productsByCategory: Product[] = [];
  allProductsByCategory: Product[] = [];
  filteredProducts: Product[] = [];
  readonly brandNames = [
    'Apple',
    'Samsung',
    'Oppo',
    'Vivo',
    'Realme',
    'Asus',
    'Huawei',
    'Dell',
    'Lenovo',
    'Amazon',
    'Beats',
    'TechGear',
    'GadgetMaster',
    'SnapTech',
    'ProVision',
  ];
  newprice: number = 0;
  minPrice: number = 0;
  maxPrice: number = 0;

  category = this.activedRoute.snapshot.params['category'];

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        tap(() => {
          this.category = this.activedRoute.snapshot.params['category'];
          this.loadProductsByCategory();
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnInit() {
    this.loadProductsByCategory();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadProductsByCategory() {
    this.productService
      .getByCategory(this.category)
      .pipe(
        tap((response) => {
          this.productsByCategory = response.products.filter(
            (product) => product.id !== 126,
          );
          this.allProductsByCategory = [...this.productsByCategory];
          this.setDefaultMaxPrice();
        }),
        catchError((error) => {
          console.error('Error loading products by category:', error);
          return EMPTY;
        }),
      )
      .subscribe();
  }
  private setDefaultMaxPrice(): void {
    if (this.allProductsByCategory.length > 0) {
      this.maxPrice = Math.max(
        ...this.allProductsByCategory.map((product) => {
          return Number((product.price * (2.6)).toFixed(2));
        }),
      );
    } else {
      this.maxPrice = 0; // Handle case where there are no products
    }
  }

  private filterProducts(products: Product[]): Product[] {
    const minPrice = this.minPrice || Number.NEGATIVE_INFINITY;
    const maxPrice = this.maxPrice || Number.POSITIVE_INFINITY;
    return products.filter((product) => {
      const newPrice = this.calculateDiscountedPrice(
        product.price,
        product.discountPercentage,
      );
      return newPrice >= minPrice && newPrice <= maxPrice;
    });
  }

  private filterByBrand(products: Product[], brand: string): Product[] {
    return products.filter((product) => product.brand === brand);
  }

  applyFilter(): void {
    // Filter by brand if selected
    const brandFilteredProducts = this.selectedBrand
      ? this.filterByBrand(this.allProductsByCategory, this.selectedBrand)
      : this.allProductsByCategory;

    // Filter by price if min or max price are set
    this.productsByCategory = this.filterProducts(brandFilteredProducts);

    console.log(this.productsByCategory);
  }

  sortByBrand(brand: string): void {
    console.log('Selected brand:', brand);
    this.selectedBrand = brand;

    // Filter by brand first, then apply price filter
    const brandFilteredProducts = this.filterByBrand(
      this.allProductsByCategory,
      brand,
    );

    this.productsByCategory = this.filterProducts(brandFilteredProducts);
    console.log(this.productsByCategory);
  }

  reset(): void {
    this.minPrice = 0;
    this.setDefaultMaxPrice(); // Call the method to set maxPrice directly
    this.selectedBrand = null;
    this.productsByCategory = [...this.allProductsByCategory];
    this.filteredProducts = [];
  }

  calculateDiscountedPrice(price: number, discountPercentage: number): number {
    if (discountPercentage > 15) {
      return (
        Number((price - (price * discountPercentage) / 100).toFixed(2)) * 2.6
      );
    } else {
      return price * 2.6;
    }
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
