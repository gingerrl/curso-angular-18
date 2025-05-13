import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';

import { routes } from './app.routes';
import { LocaleService } from './service/locale.service.service';

registerLocaleData(localeES, 'es');
registerLocaleData(localeFr, 'fr');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    {
      provide: LOCALE_ID,
      deps:[LocaleService],
      useFactory:(localeService: LocaleService) => localeService.getLocale,
    },
  ],
};
