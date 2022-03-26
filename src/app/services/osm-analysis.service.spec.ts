/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OsmAnalysisService } from './osm-analysis.service';

describe('Service: OsmAnalysis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OsmAnalysisService]
    });
  });

  it('should ...', inject([OsmAnalysisService], (service: OsmAnalysisService) => {
    expect(service).toBeTruthy();
  }));
});
