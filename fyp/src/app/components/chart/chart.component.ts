import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IWeather } from 'src/app/global/interfaces';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit{

  weatherData: IWeather | null = null; 

  constructor(private apiService: ApiService){}

  /**
   * This method is triggered upon loading the page.
   * 
   * It makes API call to retrieve weather data.
   * getWeatherData() returns Observable object, so it must be subscribed to be executed.
   */
  ngOnInit(): void {
    this.apiService.getWeatherData().subscribe(data => {
      this.weatherData = data as IWeather
      console.log(this.weatherData);
      console.log(this.weatherData.dateGenerated);
      console.log(this.weatherData.data);
    })
  }
}
