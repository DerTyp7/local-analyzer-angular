import { Injectable } from '@angular/core';
import { OsmAnalysis } from '../interfaces/osmAnalysis';
import { OSMNode, OSMNodeTag, OSMWay, OSMWayTag, OSMPlace, OSMContact, OSMAddress, OSM } from '../interfaces/osm';


@Injectable({
  providedIn: 'root'
})
export class OsmService {

nodeList: OSMNode[] = [];
nodeTagList: OSMNodeTag[] = [];
wayList: OSMWay[] = [];
wayTagList: OSMWayTag[] = [];
placeList: OSMPlace[] = [];

constructor() { }

  parseOsmContent(osmData: string): OSM{
    this.nodeList = [];
    this.nodeTagList = [];
    this.wayList = [];
    this.wayTagList = [];
    this.placeList = [];

    let lines = osmData.split('\n');
    let nodeLines: string[] = [];
    let wayLines: string[] = [];

    for(let line of lines){
      if(line.includes("<node")){
        if(line.includes("/>")){
          this.createNode([line]);
          nodeLines = [];
        }else{
          nodeLines.push(line);
        }
      }else if(line.includes("</node>")){
        this.createNode(nodeLines);
        nodeLines = [];
      }else if(nodeLines.length > 0){
        nodeLines.push(line);
      }else if(line.includes("<way")){
        wayLines.push(line);
      }else if(line.includes("</way>")){
        this.createWay(wayLines);
        wayLines = [];
      }else if(wayLines.length > 0){
        wayLines.push(line);
      }
    }

    let osm: OSM = {
      nodes: this.nodeList,
      nodeTags: this.nodeTagList,
      ways: this.wayList,
      wayTags: this.wayTagList,
      places: this.placeList
    };

    return osm;
  }

  createContact(lines: string[]): OSMContact{
    let contact: OSMContact = {};

    for(let line of lines){
      if(line.includes("<tag ")){
        let key = line.split('k="')[1].split('"')[0];
        let value = line.split('v="')[1].split('"')[0];

        if(key == "contact:phone"){
          contact.phone = value;
        }else if(key == "contact:website"){
          contact.website = value;
        }else if(key == "contact:email"){
          contact.email = value;
        }else if(key == "contact:fax"){
          contact.fax = value;
        }else if(key == "contact:facebook"){
          contact.facebook = value;
        }else if(key == "contact:twitter"){
          contact.twitter = value;
        }else if(key == "contact:instagram"){
          contact.instagram = value;
        }else if(key == "contact:youtube"){
          contact.youtube = value;
        }else if(key == "contact:ok"){
          contact.ok = value;
        }else if(key == "contact:vk"){
          contact.vk = value;
        }else if(key == "contact:whatsapp"){
          contact.whatsapp = value;
        }else if(key == "contact:telegram"){
          contact.telegram = value;
        }else if(key == "contact:skype"){
          contact.skype = value;
        }else if(key == "contact:linkedin"){
          contact.linkedin = value;
        }else if(key == "contact:sip"){
          contact.sip = value;
        }else if(key == "contact:diaspora"){
          contact.diaspora = value;
        }else if(key == "contact:gnusocial"){
          contact.gnusocial = value;
        }else if(key == "contact:xing"){
          contact.xing = value;
        }else if(key == "contact:flickr"){
          contact.flickr = value;
        }else if(key == "contact:foursquare"){
          contact.foursquare = value;
        }
      }
    }
    return contact;
  }

  createAddress(lines: string[]): OSMAddress{
    let address: OSMAddress = {};

    for(let line of lines){
      if(line.includes("<tag ")){
        let key = line.split('k="')[1].split('"')[0];
        let value = line.split('v="')[1].split('"')[0];

        if(key == "addr:street"){
          address.street = value;
        }else if(key == "addr:housenumber"){
          address.housenumber = value;
        }else if(key == "addr:postcode"){
          address.postcode = value;
        }else if(key == "addr:city"){
          address.city = value;
        }else if(key == "addr:country"){
          address.country = value;
        }else if(key == "addr:state"){
          address.state = value;
        }else if(key == "addr:province"){
          address.province = value;
        }else if(key == "addr:suburb"){
          address.suburb = value;
        }else if(key == "addr:place"){
          address.place = value;
        }
      }
    }
    return address;
  }

  createPlace(lines: string[], isShop: boolean): void{
    let place: OSMPlace = {};

    place.nodeIds = [];

    place.address = this.createAddress(lines);
    place.contact = this.createContact(lines);

    for(let line of lines){
      if(line.includes("<tag ")){
        let key = line.split('k="')[1].split('"')[0];
        let value = line.split('v="')[1].split('"')[0];

        if(key == "amenity" && !isShop){
          place.type = value;
        }else if(key == "shop" && isShop){
          place.type = value;
        }else if(key == "name"){
          place.name = value;
        }else if(key == "opening_hours"){
          place.openingHours = value;
        }
      }else if(line.includes("<nd ")){
        place.nodeIds!.push(line.split('ref="')[1].split('"')[0]);
      }else if(line.includes("<node")){
        place.nodeIds!.push(line.split('id="')[1].split('"')[0]);
      }
    }
    this.placeList.push(place);
  }

  createWay(lines: string[]): void{
    let way: OSMWay = {};

    for(let line of lines){
      if(line.includes("<way ")){
        way.id = line.split('id="')[1].split('"')[0];
        way.version = line.split('version="')[1].split('"')[0];
        way.changeset = line.split('changeset="')[1].split('"')[0];
        way.timestamp = line.split('timestamp="')[1].split('"')[0];
        way.user = line.split('user="')[1].split('"')[0];
        way.uid = line.split('uid="')[1].split('"')[0];
      }else if(line.includes("<tag ")){
        let key = line.split('k="')[1].split('"')[0];
        let value = line.split('v="')[1].split('"')[0];

        let wayTag: OSMWayTag = {
          key: key,
          value: value
        };
        this.wayTagList.push(wayTag);

        if(key == "shop"){
          this.createPlace(lines, true);
        }else if(key == "amenity"){
          this.createPlace(lines, false);
        }
      }
    }
    this.wayList.push(way);
  }

  createNode(lines: string[]): void{
    let node: OSMNode = {};

    for(let line of lines){
      if(line.includes("<node ")){
        node.id = line.split('id="')[1].split('"')[0];
        node.version = line.split('version="')[1].split('"')[0];
        node.changeset = line.split('changeset="')[1].split('"')[0];
        node.timestamp = line.split('timestamp="')[1].split('"')[0];
        node.user = line.split('user="')[1].split('"')[0];
        node.uid = line.split('uid="')[1].split('"')[0];
      }else if(line.includes("<tag ")){
        let key = line.split('k="')[1].split('"')[0];
        let value = line.split('v="')[1].split('"')[0];

        let nodeTag: OSMNodeTag = {
          key: key,
          value: value
        };
        this.nodeTagList.push(nodeTag);
      }
    }
    this.nodeList.push(node);
  }
}
