import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, inject } from '@angular/core';
import { Product, Products } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  selectedProductIdEmitter = new EventEmitter<string>();
  private readonly http = inject(HttpClient);
  readonly baseUrl = 'https://dummyjson.com/products';

  getByCategory(techname: string) {
    return this.http.get<Products>(`${this.baseUrl}/category/${techname}`);
  }
  getByBrands(brandname: string) {
    return this.http.get<Products>(`${this.baseUrl}/search?q=${brandname}`);
  }
  getProductById(id: string) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
  
}
