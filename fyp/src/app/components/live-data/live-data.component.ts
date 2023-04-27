import { Component, OnInit, ViewChild } from '@angular/core';

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
import { GlobalService } from 'src/app/services/global.service';

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
  forecastDays: number = 7;

  // ------------ Chart  ------------ 
  @ViewChild("chart") chart: ChartComponent | any;  // Chart variable
  public chartOptions: Partial<ChartOptions> | any;
  showChart: Boolean = false;
  showMap: Boolean = false;
  
  

  // Inject dependency
  constructor(private apiService: ApiService, private globalService: GlobalService) {
    // let myScriptElement: HTMLScriptElement;
    // myScriptElement = document.createElement("script");
    // myScriptElement.src = "../../../assets/js/windy_map/script.js";
    // document.body.appendChild(myScriptElement);
  }

  /**
   * Listens for the user input.
   * Whenever an input is changed, it gets the geocodings for locations
   */
  onKeyUp(){
    this.apiService.getGeoLocation(this.location).subscribe( geoCoding => {
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
      alert("Please check either one of Weather and Marine")
      return 
    }

    const targetGeocoding = this.geoCodings.at(this.dropDownSelected)
    if (targetGeocoding == undefined){
      alert("No location is selected")
      return
    }
    
    // Pre 2 : check if drop down menu is selected
    const latitude = targetGeocoding.latitude
    const longitude = targetGeocoding.longitude
    const area = targetGeocoding.name + ", " + targetGeocoding.admin1 + ", " + this.country_code
    
    if(this.radioChecked == 0){
      this.getWeatherForecast(latitude, longitude, area) // Get weather forecast
    } else {
      this.getMarineForecast(latitude, longitude, area)  // Get marine forecast
    }

  }

  private getWeatherForecast(latitude: number, longitude: number, area: string){
    
    this.apiService.getWeatherForecast(latitude, longitude, this.forecastDays).subscribe( res => {
      const weather: IWeatherForecast = res.hourly
      const refinedWeather = this.globalService.refineWeatherForecast(weather);

      // Process to build chart
      const chartSeries = [{
        name: "Temperature",
        data: refinedWeather.temperature
      }, {
        name: "Precipitation",
        data: refinedWeather.precipitation
      }, {
        name: "Precipitation Probability",
        data: refinedWeather.precipitation_probability
      }, {
        name: "Wind Speed",
        data: refinedWeather.windspeed
      }]
      this.showMap = false
      const chartTitle = "7 day weather forecast in " + area
      this.buildChart(chartSeries, chartTitle)
      
      
    });
  }

  private getMarineForecast(latitude: number, longitude: number, area: string){
    this.apiService.getMarineForcast(latitude, longitude).subscribe( res => {
      if (res.hourly == undefined){
        alert("No data is available for this location")
        return 
      }
      
      let waveHeight: any[] = []
      let swellHeight: any[] = []

      res.hourly.time.forEach( (t, i) => {
        const time = new Date(t).getTime() -new Date().getTimezoneOffset()*60*1000

        waveHeight.push({
          x: time,
          y: res.hourly.wave_height.at(i)
        })

        swellHeight.push({
          x: time,
          y: res.hourly.swell_wave_height.at(i)
        })

      })

      // Process to build chart
      const chartSeries = [{
        name: "Wave Height",
        data: waveHeight
      }, {
        name: "Swell Height",
        data: swellHeight
      }]
      this.showMap = true
      const chartTitle = "7 day marine forecast in " + area
      this.buildChart(chartSeries, chartTitle)
    });
  }

  private buildChart(chartSeries: any[], chartTitle: string) {
    this.showChart = true;
    
    // Build graph
    this.chartOptions = {
      series: chartSeries,
      chart: {
        height: 350,
        width: 1000,
        type: "line"
      },
      title: {
        text: chartTitle
      },
      xaxis: {
        type: "datetime"
      }
    };

  }


}
