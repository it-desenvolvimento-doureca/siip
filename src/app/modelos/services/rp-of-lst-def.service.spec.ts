import { TestBed, inject } from '@angular/core/testing';

import { RPOFLSTDEFService } from './rp-of-lst-def.service';

describe('RPOFLSTDEFService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RPOFLSTDEFService]
    });
  });

  it('should be created', inject([RPOFLSTDEFService], (service: RPOFLSTDEFService) => {
    expect(service).toBeTruthy();
  }));
});
