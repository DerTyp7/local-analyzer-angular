
export interface OSMContact{
  phone?: string;
  fax?: string;
  email?: string;
  website?: string;
  mobile?: string;
  vk?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  ok?: string;
  webcam?: string;
  telegram?: string;
  whatsapp?: string;
  linkedin?: string;
  pinterest?: string;
  viper?: string;
  foursquare?: string;
  skype?: string;
  xing?: string;
  vhf?: string;
  flickr?: string;
  mastodon?: string;
  sip?: string;
  diaspora?: string;
  gnusocial?: string;
}

export interface OSMAddress{
  housenumber?: string;
  street?: string;
  place?: string;
  city?: string;
  postcode?: string;
  country?: string;
  suburb?: string;
  state?: string;
  province?: string;
}


export interface OSMPlace{
  nodeIds?: Array<string>;
  type?: string;
  name?: string;
  address?: OSMAddress;
  contact?: OSMContact;
  openingHours?: string;
}

export interface OSMNode{
  id?: string;
  lon?: string;
  lat?: string;
  version?: string;
  timestamp?: string;
  changeset?: string;
  uid?: string;
  user?: string;
}

export interface OSMNodeTag{
  id?: string;
  nodeId?: string;
  key?: string;
  value?: string;
}

export interface OSMWay{
  id?: string;
  version?: string;
  timestamp?: string;
  changeset?: string;
  uid?: string;
  user?: string;
}

export interface OSMWayTag{
  id?: string;
  wayId?: string;
  key?: string;
  value?: string;
}

export interface OSM{
  nodes?: Array<OSMNode>;
  nodeTags?: Array<OSMNodeTag>;
  ways?: Array<OSMWay>;
  wayTags?: Array<OSMWayTag>;
  places?: Array<OSMPlace>;
}
