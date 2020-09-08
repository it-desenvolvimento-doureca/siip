import { TestBed, inject } from '@angular/core/testing';

import { STPEDIDOSService } from './st-pedidos.service';

describe('STPEDIDOSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [STPEDIDOSService]
    });
  });

  it('should be created', inject([STPEDIDOSService], (service: STPEDIDOSService) => {
    expect(service).toBeTruthy();
  }));
});
