import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constants } from '../global/constants';
import { IGeocoding, ILatLon, IMarine, INewsArray, IWeather, IWeatherForecast } from '../global/interfaces';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private globalService: GlobalService) { }
  
  /**
   * API call to get geographical infomation of an input
   * 
   * @param location a location to find geolocation
   * @returns 
   */
  getGeoLocation(location: string){
    const endpoint = "https://geocoding-api.open-meteo.com/v1/search";
    const parameters = "?name=" + location + "&count=10&language=en&format=json";
    return this.http.get<IGeocoding>(endpoint + parameters);
  }

  getWeatherForecast(latitude: number, longitude: number, days: number){
    const endpoint = "https://api.open-meteo.com/v1/forecast"
    const parameters = "?latitude="+latitude+"&longitude="+longitude+"&hourly=temperature_2m,precipitation_probability,precipitation,windspeed_10m&forecast_days="+days+"&timezone=auto"
    return this.http.get<IWeather>(endpoint+parameters)
  }

  getMarineForcast(latitude: number, longitude: number){
    const endpoint = "https://marine-api.open-meteo.com/v1/marine?"
    const parameters = "latitude="+latitude+"&longitude="+longitude+"&hourly=wave_height,swell_wave_height&timezone=auto"
    return this.http.get<IMarine>(endpoint+parameters)
  }

  getGeoLocationByIP(){
    const url = "https://api.ipgeolocation.io/ipgeo?apiKey=970bcd945a1d45c3957eed74659788c6"
    return this.http.get<ILatLon>(url)
  }

  getCoralNews() {
    // const url = "https://newsdata.io/api/1/news?apikey=pub_21416fcf22849dd68fbe2b9acc01dc71094a2&q=ocean&country=au&language=en "
    
    // Set from date to 3 days ago
    const d = new Date()
    d.setDate(d.getDate() - 3)

    const year:string = d.getFullYear().toString();
    
    let month: number | string = d.getMonth() + 1;
    if( month < 10){
      month = '0' + month.toString
    }

    const date = d.getDate()

    const fromDate = year + "-" + month + "-" + date

    const endPoint = "https://newsapi.org/v2/everything"
    const parameters = "?q=+reef&from="+fromDate+"&sortBy=popularity&apiKey=d12e476f9663461886c8af678d6e1d7e"
    return this.http.get<INewsArray>(endPoint + parameters)
  }
}
