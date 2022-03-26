import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverpassApiService {

constructor(private http: HttpClient) { }

  sendQueryRequest(queryString: string){
    console.log("queryString: " + queryString);
    return this.http.get("https://overpass-api.de/api/map?bbox=" + queryString, { observe: 'body', responseType: 'text'});
  }
}
