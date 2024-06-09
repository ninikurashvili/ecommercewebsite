import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsortFilterComponent } from './productsort-filter.component';

describe('ProductsortFilterComponent', () => {
  let component: ProductsortFilterComponent;
  let fixture: ComponentFixture<ProductsortFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsortFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsortFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
