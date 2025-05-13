import { TestBed } from '@angular/core/testing';

import { LocaleServiceService } from './locale.service.service';

describe('LocaleServiceService', () => {
  let service: LocaleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
