import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private productIdsSource = new BehaviorSubject<Set<number>>(new Set());
  productIds$ = this.productIdsSource.asObservable();

  private productDeletedSource = new Subject<number>();
  productDeleted$ = this.productDeletedSource.asObservable();

  addProductId(id: number) {
    const currentIds = this.productIdsSource.value;
    currentIds.add(id);
    this.productIdsSource.next(new Set(currentIds));
  }

  deleteProductId(id: number) {
    const currentIds = this.productIdsSource.value;
    if (currentIds.delete(id)) {
      this.productIdsSource.next(new Set(currentIds));
      this.productDeletedSource.next(id);
    }
  }
}