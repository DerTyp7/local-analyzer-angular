/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OverpassApiService } from './overpass-api.service';

describe('Service: OverpassApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OverpassApiService]
    });
  });

  it('should ...', inject([OverpassApiService], (service: OverpassApiService) => {
    expect(service).toBeTruthy();
  }));
});
