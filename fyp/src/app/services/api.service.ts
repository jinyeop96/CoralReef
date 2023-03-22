import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constants } from '../global/constants';
import { ILatLon, IWeather } from '../global/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
 /**
  * For more info : https://www.meteomatics.com/en/api/getting-started/
  * 
  * API calls to retrieve weather data of designated date, time and interval.
  * @param from the start date and time
  * @param intervalHours interval hours
  * @param to the end date and time
  * @param lat latitude of the location
  * @param lon longitude of the location
  * @returns Observable containing the weather data
  */
  getWeatherData(from: string, intervalHours: number, to: string, lat: number, lon: number){
    // Set the date and time interval
    const parameters = from + "--" + to + ":PT"+intervalHours+"H/t_2m:C/" + lat + "," + lon + "/json";;
    
    // Setting the HttpHeader for API call
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .set('Authorization', "Basic " + window.btoa("monashuniversity_oh:K4QN9hlP1p"));

    // Get data
    return this.http.get<IWeather>(Constants.API_WEATHER_ENDPOINT + parameters, { headers: headers });
  }

  /**
   * API call to retrieve the lat and lon of the location
   * @param location a location 
   * @returns Observable containing the lat and lon info.
   */
  getLatAndLong(location: string) {
    const parameters = "q=" + location + "&limit=1&appid=" + "5d0c8305da2579391b95c3ca3195f7d2";
    return this.http.get<ILatLon[]>(Constants.API_LAT_LONG_ENDPOINT + parameters);
  }

}
