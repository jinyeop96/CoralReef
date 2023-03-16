import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constants } from '../global/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Parameters for passing with API call
  parameters: string = "2023-03-15T00:00:00Z--2023-03-18T00:00:00Z:PT1H/t_2m:C/52.520551,13.461804/json";
  
  getWeatherData(){
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .set('Authorization', "Basic " + window.btoa("monashuniversity_oh:K4QN9hlP1p"));

    return this.http.get(Constants.API_WEATHER_ENDPOINT + this.parameters, { headers: headers });
    

  }

}
