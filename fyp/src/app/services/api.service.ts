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
   * Retrieves air and marine forecast of designated location
   * 
   * For more information : https://www.weatherapi.com/docs/#intro-request
   * 
   * @param location a target location
   * @param days number of days of forecast
   * @returns Observable containing air and marine forecast data
   */
  getWeatherData(location: string, days: number){
    // Set the date and time interval
    const parameters = "marine.json?key=" + Constants.API_WEATHER_KEY + "&q=" + location + "&days=" + days + "&aqi=yes&alerts=no";
    
    /**
     * HttpHeader set up
     * const headers = new HttpHeaders()
     *   .set("Content-type", "application/json")
     *   .set('Authorization', "Basic " + window.btoa("monashuniversity_oh:K4QN9hlP1p"));
     */

    return this.http.get<IWeather>(Constants.API_WEATHER_ENDPOINT + parameters);
  }

  /**
   *** DEPRECATED ****
   * 
   * API call to retrieve the lat and lon of the location
   * @param location a location 
   * @returns Observable containing the lat and lon info.
   */
  getLatAndLong(location: string) {
    const parameters = "q=" + location + "&limit=1&appid=" + "5d0c8305da2579391b95c3ca3195f7d2";
    return this.http.get<ILatLon[]>(Constants.API_LAT_LONG_ENDPOINT + parameters);
  }

  

}
