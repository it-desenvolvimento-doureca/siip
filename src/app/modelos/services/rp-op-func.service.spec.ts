import { TestBed, inject } from '@angular/core/testing';

import { RPOPFUNCService } from './rp-op-func.service';

describe('RPOPFUNCService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RPOPFUNCService]
    });
  });

  it('should be created', inject([RPOPFUNCService], (service: RPOPFUNCService) => {
    expect(service).toBeTruthy();
  }));
});
