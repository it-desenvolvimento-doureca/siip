import { TestBed, inject } from '@angular/core/testing';

import { RPOFOPCABService } from './rp-of-op-cab.service';

describe('RPOFOPCABService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RPOFOPCABService]
    });
  });

  it('should be created', inject([RPOFOPCABService], (service: RPOFOPCABService) => {
    expect(service).toBeTruthy();
  }));
});
