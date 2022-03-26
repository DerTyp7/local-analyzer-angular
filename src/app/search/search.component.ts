import { Component, OnInit } from '@angular/core';
import { Photon, PhotonFeatureCollection } from '../interfaces/photon';
import { PhotonService } from '../services/photon.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  selectedPhoton?: PhotonFeatureCollection;

  searchResults?: Array<Photon>;

  constructor(
    private photonService: PhotonService
  ) { }

  ngOnInit() {
  }

  inputChange(value: string) {
    this.searchResults = [];
    this.photonService.sendQueryRequest(value.replace(/[0-9]/g, ''))
      .subscribe((response: PhotonFeatureCollection) => response.features?.forEach(feature => {
        this.searchResults?.push(feature);
      })
    );
  }
}
