import { TestBed } from '@angular/core/testing';

import { SniperService } from './snipers.service';

describe('SnipersService', () => {
  let service: SniperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SniperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
