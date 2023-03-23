import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IWeather, ILatLon, ILocation, IForecastDay, IForecast, IHour } from 'src/app/global/interfaces';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
  // Not in use variables
  latLons: ILatLon | null = null;
  // date: Date = new Date();
  // intervalHours: number = 3;

  // Variables
  days: number = 3;
  location: string = "Melbourne"; // [(ngModel)] is used to bind with this variable.

  weatherData: IWeather | null = null;
  resultLocation: ILocation | null = null;
  resultForecastDays: IForecastDay[] = [];
  resultDays: any[] = []

  // Constructor
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Pass
  }

  /**
   * Triggers upon user clicks button
   * 
   * subscribes to an observable contatining air and marine forecast
   * Once, it returns data, distributes on HTML
   */
  getWeather() {
    this.apiService.getWeatherData(this.location, 7).subscribe(res => {
      this.weatherData = res
      this.resultLocation = this.weatherData.location;
      this.resultForecastDays = this.weatherData.forecast.forecastday

      this.resultDays = []  // Reset before retrieving new data

      this.resultForecastDays.forEach((forecastDay, day) => {
        this.resultDays[day] = forecastDay
      })
    })
  }

  /**
   * Returns latitude and longitude 
   * @param location a target location
   */
  getLatLon(location: string) {
    this.apiService.getLatAndLong(this.location).subscribe(res => {
      // Set the lat and lon for the location
      this.latLons = {
        lat: res[0].lat,
        lon: res[0].lon
      }
    })
  }
}
