import { Product } from './../interfaces/product';
import { Directive, HostListener, Input } from '@angular/core';
import Swal from 'sweetalert2';

@Directive({
  selector: '[appAddtocart]',
  standalone: true,
})
export class AddtocartDirective {
  constructor() {}
  @HostListener('click') onClick() {
    Swal.fire({
      title: 'პროდუქტი დაემატა კალათაში!',
      text: '',
      icon: 'success',
    });
  }
}
