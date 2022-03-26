/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PhotonService } from './photon.service';

describe('Service: Photon', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotonService]
    });
  });

  it('should ...', inject([PhotonService], (service: PhotonService) => {
    expect(service).toBeTruthy();
  }));
});
