import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertprice',
  standalone: true,
})
export class ConvertpricePipe implements PipeTransform {
  private readonly exchangeRate = 2.6;

  transform(value: number, ...args: unknown[]): string {
    if (value == null || isNaN(value)) {
      return '';
    }
    const gelValue = value * this.exchangeRate;
    return `${gelValue.toFixed(2)} GEL`;
  }
}
