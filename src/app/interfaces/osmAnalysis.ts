
export interface PublicTransportAccessability {
  isBusAccessible: boolean;
  isTramAccessible: boolean;
  isTrainAccessible: boolean;
  isLightRailAccessible: boolean;
  isMonorailAccessible: boolean;
  isSubwayAccessible: boolean;
}


export interface OsmAnalysis {
  publicTransportAccessability: PublicTransportAccessability;
}
