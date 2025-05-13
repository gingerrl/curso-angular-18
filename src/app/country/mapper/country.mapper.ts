import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper{

  static RestCountry(item: RESTCountry): Country {
    return {
      capital: item.capital?.join(','),
      cca2: item.cca2,
      flagSvg: item.flag,
      svg: item.flags.svg,
      name: item.translations['spa'].common ?? 'No Spanish name',
      population: item.population,
      flag:item.flag,
      region: item.region,
      subRegion: item.subregion

    };
  }

  static RestCountryArray(items: RESTCountry[]) : Country[]{
    return items.map(this.RestCountry)
  }
}