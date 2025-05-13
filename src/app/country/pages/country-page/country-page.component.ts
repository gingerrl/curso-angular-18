import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryServiceService } from '../../services/country-service.service';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { CountryInformationComponent } from './country-information/country-information.component';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'country-page',
  standalone: true,
  imports: [
    NotFoundComponent,
    CountryInformationComponent
  ],
  templateUrl: './country-page.component.html',
  styles: ``,
})
export class CountryPageComponent {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryServiceService);

  countryResource = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      return this.countryService.searchCountryByAlphaCode(request.code);
    },
  });
}
