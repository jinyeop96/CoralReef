import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';
import { IResult, IWeatherForecast } from 'src/app/global/interfaces';

// Declare JS function to use here.
declare function setWindyMap(lat: number, lon: number): void;

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
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  // ------------ Variables ------------ 
  // Search Bar
  country_code: string = "AU";
  location: string = "";

  geoCodings: IResult[] = []
  dropDownSelected: number = -1;
  forecastDays: number = 7;

  // Chart
  @ViewChild("chart") chart: ChartComponent | any;  // Chart variable
  public chartOptions: Partial<ChartOptions> | any;
  showChart: Boolean = false;
  showTempMap: Boolean = false;

  // ------------ Constructor ------------ 
  constructor(private apiService: ApiService, private globalService: GlobalService) { }

  /**
   * Listens for the user input.
   * Whenever an input is changed, it gets the geocodings for locations
   */
  onKeyUp() {
    this.apiService.getGeoLocation(this.location).subscribe(geoCoding => {
      // Reset relavant variables
      this.geoCodings = []
      this.dropDownSelected = 0

      // Pre : if no such location was found, terminate.
      if (geoCoding.results == undefined) {
        this.dropDownSelected = -1
        return
      }

      // Filter out locations only in country_code (Australia).
      // UNCOMMENT the following to allow all locations in the world. // this.geocodingResults = geoCoding.results

      geoCoding.results.forEach(result => {
        if (result.country_code == this.country_code) {
          this.geoCodings.push(result)
        }
      })

    });
  }

  onClickGetForecast() {
    const targetGeocoding = this.geoCodings.at(this.dropDownSelected)
    if (targetGeocoding == undefined) {
      alert("No location is selected")
      return
    }

    const latitude = targetGeocoding.latitude
    const longitude = targetGeocoding.longitude
    const area = targetGeocoding.name + ", " + targetGeocoding.admin1 + ", " + this.country_code

    // Get weather forecast
    this.getWeatherForecast(latitude, longitude, area) 
  }

  private getWeatherForecast(latitude: number, longitude: number, area: string) {

    this.apiService.getWeatherForecast(latitude, longitude, this.forecastDays).subscribe(res => {
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
 
      this.showTempMap = true
      const chartTitle = "7 day weather forecast in " + area

      // Display Windy Map
      setWindyMap(latitude, longitude);

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
