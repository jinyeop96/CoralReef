import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constants } from '../global/constants';
import { IGeocoding, IWeather, IWeatherForecast } from '../global/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  /**
   * API call to get geographical infomation of an input
   * 
   * @param location a location to find geolocation
   * @returns 
   */
  getGeocoding(location: string){
    const endpoint = "https://geocoding-api.open-meteo.com/v1/search";
    const parameters = "?name=" + location + "&count=10&language=en&format=json";
    return this.http.get<IGeocoding>(endpoint + parameters);
  }

  getWeatherForecast(latitude: number, longitude: number){
    const endpoint = "https://api.open-meteo.com/v1/forecast"
    const parameters = "?latitude="+latitude+"&longitude="+longitude+"&hourly=temperature_2m,precipitation_probability,precipitation,windspeed_10m"
    return this.http.get<IWeather>(endpoint+parameters)
  }

  getMarineForcast(latitude: number, longitude: number){
  }
}
