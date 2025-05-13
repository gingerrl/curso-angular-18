import { Component, inject, linkedSignal, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryServiceService } from '../../services/country-service.service';
import {  of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  standalone: true,
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  styles: ``,
})
export class ByCapitalPageComponent {
  countryService = inject(CountryServiceService);

  activatedRoute= inject(ActivatedRoute);
  queyParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  router= inject(Router)

  query = linkedSignal( () =>this.queyParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      console.log({query: request.query})
      if (!request.query) return of([]);

      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query
        }
      })

      return this.countryService.searchBycapital(request.query);
    },
  });
  // query = signal('')
  // countryResource = resource({
  //   request:() => ({
  //     query: this.query()
  //   }),
  //   loader: async() =>{
  //     if(!this.query()) return [];

  //     return await firstValueFrom(this.countryService.searchBycapital(request.query))
  //   }
  // })



  //  isLoading = signal(false);
  //  isError = signal<string | null>(null);
  //  countries = signal<Country[]>([]);

  //  onSearch(value: string) {
  //    if (this.isLoading()) return;
  //    this.isLoading.set(true);
  //    this.isError.set(null);
  //    this.countryService.searchBycapital(value).subscribe({
  //      next: (countries) => {
  //        this.isLoading.set(false);
  //        this.countries.set(countries);
  //      },
  //      error: (err) => {
  //        this.isLoading.set(false);
  //        this.countries.set([]);
  //        this.isError.set(err);
  //      },
  //    });
  //  }
}
