import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mapper/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL= 'https://restcountries.com/v3.1'


@Injectable({
  providedIn: 'root'
})
export class CountryServiceService {

  private http =inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>()
  private queryCacheCountry = new Map<string, Country[]>()
  private queryCacheRegion = new Map<string, Country[]>()

  constructor() { }


  searchBycapital(query: string): Observable<Country[]>{
    query= query.toLowerCase();

    if(this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query) ?? [])
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map((item) =>CountryMapper.RestCountryArray(item) ),
      tap(countries => this.queryCacheCapital.set(query, countries)),
      catchError(error => {
        return throwError(() => new Error('No se puede obtener paises con ese query '))
      })
    )
  }

  searchByCountry(query:string){

    query= query.toLowerCase();

    console.log(`Llegando al servidor por ${query}`)
    if(this.queryCacheCountry.has(query)){
      return of(this.queryCacheCountry.get(query) ?? [])
    }


    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map((item) =>CountryMapper.RestCountryArray(item) ),
      tap(countries => this.queryCacheCountry.set(query, countries)),
      delay(2000),
      catchError(error => {
        console.log('error', error);
        return throwError(() => new Error('No se puede obtener paises con ese query '))
      })
    )
  }


  searchByRegion(region:Region){
    console.log(`Llegando al servidor por ${region}`)
    if(this.queryCacheRegion.has(region)){
      return of(this.queryCacheRegion.get(region) ?? [])
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
    .pipe(
      map((item) =>CountryMapper.RestCountryArray(item) ),
      tap(countries => this.queryCacheRegion.set(region, countries)),
      delay(2000),
      catchError(error => {
        console.log('error', error);
        return throwError(() => new Error('No se puede obtener region con ese query '))
      })
    )
  }


  searchCountryByAlphaCode(code:string){
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    .pipe(
      map((item) =>CountryMapper.RestCountryArray(item) ),
      map(countries => countries.at(0)),
      delay(2000),
      catchError(error => {
        console.log('error', error);
        return throwError(() => new Error(`No se puede obtener paises con ese codigo ${code}`))
      })
    )
  }
}
