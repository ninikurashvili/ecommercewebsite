import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, inject } from '@angular/core';
import { Product, Products, User } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  selectedProductIdEmitter = new EventEmitter<string>();
  private readonly http = inject(HttpClient);
  readonly baseUrl = 'https://dummyjson.com/products';
  private userUrl = 'http://dummyjson.com/users/add';
  getByCategory(techname: string) {
    return this.http.get<Products>(`${this.baseUrl}/category/${techname}`);
  }
  getByBrands(brandname: string) {
    return this.http.get<Products>(`${this.baseUrl}/search?q=${brandname}`);
  }
  getProductById(id: string) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
  addUser(user: User): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(user);
    console.log(body);
    return this.http.post(this.userUrl, body, { headers: headers });
  }
}
