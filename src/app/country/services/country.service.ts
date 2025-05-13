import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountryService {

  private baseUrl ='https://restcountries.com/v3.1'
  private http= inject(HttpClient)


  private _regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',

  ]

  get regions(): string[]{
    return [...this._regions]
  }

  getCountriesByRegion(region:string) : Observable<Country[]>{
    if(!region) return of([])
      const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url)
  }

  getCountryByAlphacode(alphacode: string): Observable<Country>{
    const url = `${this.baseUrl}/alpha/${alphacode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url)
  }

  getCountryNamesByCode(borders: string[]): Observable<Country[]>{
    if(!borders || borders.length ===0) return of([]);

    const countriesRequests: Observable<Country>[] = [];

    borders.forEach(code => {
      const request = this.getCountryByAlphacode(code);
      countriesRequests.push(request)
    })
    return combineLatest(countriesRequests)
  }
}