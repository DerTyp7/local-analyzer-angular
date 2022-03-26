import { Injectable } from '@angular/core';
import { OSM } from '../interfaces/osm';
import { OsmAnalysis, PublicTransportAccessability } from '../interfaces/osmAnalysis';

@Injectable({
  providedIn: 'root'
})
export class OsmAnalysisService {

constructor() { }
  getPublicTransportAccessability(osm: OSM): PublicTransportAccessability {
    let publicTransportAccessability: PublicTransportAccessability = {
      isBusAccessible: false,
      isTramAccessible: false,
      isTrainAccessible: false,
      isLightRailAccessible: false,
      isMonorailAccessible: false,
      isSubwayAccessible: false
    };

    for(let nodeTag of osm.nodeTags!){
      if(nodeTag.key === "highway" && nodeTag.value === "bus_stop"){
        publicTransportAccessability.isBusAccessible = true;
      }else if(nodeTag.key === "railway" && nodeTag.value === "tram_stop"){
        publicTransportAccessability.isTramAccessible = true;
      }else if(nodeTag.key === "railway" && nodeTag.value === "station"){
        publicTransportAccessability.isTrainAccessible = true;
      }else if(nodeTag.key === "station" && nodeTag.value === "light_rail"){
        publicTransportAccessability.isLightRailAccessible = true;
      }else if(nodeTag.key === "station" && nodeTag.value === "monorail"){
        publicTransportAccessability.isMonorailAccessible = true;
      }else if(nodeTag.key === "station" && nodeTag.value === "subway"){
        publicTransportAccessability.isSubwayAccessible = true;
      }
    }

    return publicTransportAccessability;
  }

  getOsmAnalysis(osm: OSM): OsmAnalysis {
    let osmAnalysis: OsmAnalysis = {
      publicTransportAccessability: this.getPublicTransportAccessability(osm)
    };

    return osmAnalysis;
  }
}
