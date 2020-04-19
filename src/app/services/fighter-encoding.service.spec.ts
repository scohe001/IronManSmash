import { TestBed } from '@angular/core/testing';

import { FighterEncodingService } from './fighter-encoding.service';

describe('FighterEncodingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FighterEncodingService = TestBed.get(FighterEncodingService);
    expect(service).toBeTruthy();
  });
});
