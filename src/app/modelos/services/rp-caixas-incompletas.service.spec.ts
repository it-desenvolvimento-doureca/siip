import { TestBed, inject } from '@angular/core/testing';

import { RPCAIXASINCOMPLETASService } from './rp-caixas-incompletas.service';

describe('RPCAIXASINCOMPLETASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RPCAIXASINCOMPLETASService]
    });
  });

  it('should be created', inject([RPCAIXASINCOMPLETASService], (service: RPCAIXASINCOMPLETASService) => {
    expect(service).toBeTruthy();
  }));
});
