import { TestBed, inject } from '@angular/core/testing';

import { GEREVENTOService } from './ger-evento.service';

describe('GEREVENTOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GEREVENTOService]
    });
  });

  it('should be created', inject([GEREVENTOService], (service: GEREVENTOService) => {
    expect(service).toBeTruthy();
  }));
});
