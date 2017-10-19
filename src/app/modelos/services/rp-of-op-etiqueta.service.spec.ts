import { TestBed, inject } from '@angular/core/testing';

import { RPOFOPETIQUETAService } from './rp-of-op-etiqueta.service';

describe('RPOFOPETIQUETAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RPOFOPETIQUETAService]
    });
  });

  it('should be created', inject([RPOFOPETIQUETAService], (service: RPOFOPETIQUETAService) => {
    expect(service).toBeTruthy();
  }));
});
