import { TestBed } from '@angular/core/testing';

import { HotelResolverService } from './hotel-resolver.service';

describe('HotelResolverService', () => {
  let service: HotelResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
