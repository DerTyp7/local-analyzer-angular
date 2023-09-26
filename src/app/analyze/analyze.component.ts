import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { OverpassApiService } from '../services/overpass-api.service';
import { OsmAnalysis } from '../interfaces/osmAnalysis';
import { OsmService } from '../services/osm.service';
import { OSM } from '../interfaces/osm';
import { OsmAnalysisService } from '../services/osm-analysis.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {
  lon!: string | null;
  lat!: string | null;

  status: string = "";

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

    this.status = "Downloading OSM data... This might take a few minutes ";

    this.overpassApiService.sendQueryRequest(`${minLon},${minLat},${maxLon},${maxLat}`)
      .pipe(catchError(err => {
        console.error(err);
        this.status = "<label style='color:rgb(209, 39, 39); font-weight:bold;'>Dowloading OSM data failed!</label>\
      <br>You may have been set on pause by the server, because of too many requests in a short amount of time.";
        return of("");
      }))
      .subscribe((data: string) => {
        if (data != "") {
          let osm: OSM = this.osmService.parseOsmContent(data);
          // Analyze the OSM data
          this.status = "Analyze OSM data...";
          this.osmAnalysis = this.osmAnalysisService.getOsmAnalysis(osm);
          this.status = "";
        }
      });
  }

}
