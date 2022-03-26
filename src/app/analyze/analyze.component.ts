import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { OverpassApiService } from '../services/overpass-api.service';
import { OsmAnalysis } from '../interfaces/osmAnalysis';
import { OsmService } from '../services/osm.service';
import { OSM } from '../interfaces/osm';
import { OsmAnalysisService } from '../services/osm-analysis.service';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {
  lon!: string | null;
  lat!: string | null;

  osmAnalysis?: OsmAnalysis;

  constructor(
    private route: ActivatedRoute,
    private overpassApiService: OverpassApiService,
    private osmService: OsmService,
    private osmAnalysisService: OsmAnalysisService
  ) { }

  ngOnInit() {
    this.lon = this.route.snapshot.paramMap.get('lon');
    this.lat = this.route.snapshot.paramMap.get('lat');

    let minLon: number = parseFloat(this.lon!) - 0.1;
    let maxLon: number = parseFloat(this.lon!) + 0.1;
    let minLat: number = parseFloat(this.lat!) - 0.13;
    let maxLat: number = parseFloat(this.lat!) + 0.13;


    this.overpassApiService.sendQueryRequest(`${minLon},${minLat},${maxLon},${maxLat}`).subscribe(data => {
      console.log(data);
      let osm: OSM = this.osmService.parseOsmContent(data);
      // Analyze the OSM data
      this.osmAnalysis = this.osmAnalysisService.getOsmAnalysis(osm);
    });
  }

}
