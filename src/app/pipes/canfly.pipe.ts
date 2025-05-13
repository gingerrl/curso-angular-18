import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canfly'
})

export class CanflyPipe implements PipeTransform {
  transform(canfly : boolean): string {
    return canfly ? 'Puede Volar' :' No puede volar'
  }
}