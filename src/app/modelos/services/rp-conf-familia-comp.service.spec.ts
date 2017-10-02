import { TestBed, inject } from '@angular/core/testing';

import { RPCONFFAMILIACOMPService } from './rp-conf-familia-comp.service';

describe('RPCONFFAMILIACOMPService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RPCONFFAMILIACOMPService]
    });
  });

  it('should be created', inject([RPCONFFAMILIACOMPService], (service: RPCONFFAMILIACOMPService) => {
    expect(service).toBeTruthy();
  }));
});
