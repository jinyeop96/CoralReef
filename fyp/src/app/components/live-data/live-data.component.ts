import { Component, ViewChild } from '@angular/core';

import { IResult, IWeatherForecast } from 'src/app/global/interfaces';
import { ApiService } from 'src/app/services/api.service';

// ApexCharts
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-live-data',
  templateUrl: './live-data.component.html',
  styleUrls: ['./live-data.component.css']
})
export class LiveDataComponent {
  // ------------ Searching location ------------ 
  country_code: string = "AU";
  location: string = "";
  
  geoCodings: IResult[] = []
  dropDownSelected: number = -1;
  radioChecked: number = -1;


  // ------------ Chart  ------------ 
  @ViewChild("chart") chart: ChartComponent | any;  // Chart variable
  public chartOptions: Partial<ChartOptions> | any;

  show_temp_chart: Boolean = false;
  temperature: [] | any = []
  precipitation_probability: [] | any = []
  precipitation: any[] = []
  windspeed: any[] = []
  
  // Inject dependency
  constructor(private apiService: ApiService) {}

  /**
   * Listens for the user input.
   * Whenever an input is changed, it gets the geocodings for locations
   */
  onKeyUp(){
    this.apiService.getGeocoding(this.location).subscribe( geoCoding => {
      // Reset
      this.geoCodings=[]  
      this.dropDownSelected = 0
      
      // Pre : if no such location was found, terminate.
      if (geoCoding.results == undefined){
        this.dropDownSelected = -1
        return
      }
      
      // Filter out locations only in country_code (Australia).
      // UNCOMMENT the following to allow all locations in the world. // this.geocodingResults = geoCoding.results
      
      geoCoding.results.forEach( result =>{
        if(result.country_code == this.country_code){
          this.geoCodings.push(result)
        }
      })

    });
  }

  onClickGetForecast(){
    // Pre 1 : check if radio button is checked
    if (this.radioChecked == -1){
      return 
    }
    
    // Pre 2 : check if drop down menu is selected
    const latitude = this.geoCodings.at(this.dropDownSelected)?.latitude
    const longitude = this.geoCodings.at(this.dropDownSelected)?.longitude
    
    if(latitude == undefined || longitude == undefined){
      return
    }

    
    if(this.radioChecked == 0){
      this.getWeatherForecast(latitude, longitude) // Get weather forecast
    } else {
      this.getMarineForecast(latitude, longitude)  // Get marine forecast
    }

  }
  private getWeatherForecast(latitude: number, longitude: number){
    
    this.apiService.getWeatherForecast(latitude, longitude).subscribe( res => {
      let weather: IWeatherForecast = res.hourly
      
      this.temperature = []
      this.precipitation = []
      this.precipitation_probability = []
      this.windspeed = []
      weather.time.forEach( (t, i) => {
        const time = new Date(t).getTime() -new Date().getTimezoneOffset()*60*1000
        
        this.temperature.push({
          x: time,
          y: weather.temperature_2m.at(i)
        });

        this.precipitation.push({
          x: time,
          y: weather.precipitation.at(i)
        });

        this.precipitation_probability.push({
          x: time,
          y: weather.precipitation_probability.at(i)
        })

        this.windspeed.push({
          x: time,
          y: weather.windspeed_10m.at(i)
        })
      });
    
      this.show_temp_chart = true;
      this.buildChart()
      
      
    });
  }

  private getMarineForecast(latitude: number, longitude: number){

  }

  private buildChart() {
    // Build graph
    this.chartOptions = {
      series: [{
        name: "temperature",
        data: this.temperature
      }, {
        name: "precipitation",
        data: this.precipitation
      }, {
        name: "precipitation_probability",
        data: this.precipitation_probability
      }, {
        name: "wind speed",
        data: this.windspeed
      }],
      chart: {
        height: 350,
        width: 1000,
        type: "line"
      },
      title: {
        text: "Ocean Acidification (pH) from 1989 - 2014"
      },
      xaxis: {
        type: "datetime"
      }
    };

  }


}
