/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OsmService } from './osm.service';

describe('Service: Osm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OsmService]
    });
  });

  it('should ...', inject([OsmService], (service: OsmService) => {
    expect(service).toBeTruthy();
  }));
});
