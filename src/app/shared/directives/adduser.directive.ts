import { Directive, HostListener } from '@angular/core';
import Swal from 'sweetalert2';

@Directive({
  selector: '[appAdduser]',
  standalone: true,
})
export class AdduserDirective {
  constructor() {}
  @HostListener('click') onClick() {
    Swal.fire({
      title: 'თქვენ დარეგისტრირდით',
      text: '',
      icon: 'success',
    });
  }
}
