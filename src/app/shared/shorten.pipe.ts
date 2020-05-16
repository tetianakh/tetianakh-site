import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  defaultLength = 100;

  transform(value: string, length?: number) {
    if (length == null) {
      length = this.defaultLength;
    }
    if (value.length <= length - 3) {
      return value;
    }
    return value.slice(0, length) + '...';
  }
}
