import { Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information-page',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './country-information.component.html',
  styles: ``
})
export class CountryInformationComponent {

  country = input.required<Country>();

  currentYear = computed(() => {
    return new Date().getFullYear();
  });
}
