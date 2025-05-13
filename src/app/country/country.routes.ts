import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryLayoutPageComponent } from './layouts/country-layout-page/country-layout-page.component';
import { ByCountryComponent } from './pages/by-country/by-country.component';
import { ByRegionComponent } from './pages/by-region/by-region.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

export const countryRoutes: Routes = [

  {
    path:'',
    component:CountryLayoutPageComponent,
    children:[
      {
        path:'by-capital',
        component:ByCapitalPageComponent
      },
      {
        path:'by-country',
        component:ByCountryComponent
      },
      {
        path:'by-region',
        component:ByRegionComponent
      },


      {
        path:'by/:code',
        component:CountryPageComponent
      },

      {
        path:'**',
        redirectTo:'by-capital'
      }
    ]
  },
  //  {
  //    path:'country',
  //     loadChildren:() => import('.')
  //  },

];


export default countryRoutes