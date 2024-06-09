import { Product } from './../interfaces/product';
import { Directive, HostListener, Input } from '@angular/core';
import Swal from 'sweetalert2';

@Directive({
  selector: '[appAddtocart]',
  standalone: true,
})
export class AddtocartDirective {
  // @Input() product: Product|null;
  constructor() {}
  @HostListener('click') onClick() {
    Swal.fire({
      title: 'nice',
      text: 'The product added to the cart!',
      icon: 'success',
    });
  }
}
