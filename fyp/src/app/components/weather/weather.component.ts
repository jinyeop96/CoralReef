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
  countryCode: string = "AU";
  location: string = "";

  geoCodings: IResult[] = []
  dropDownSelected: number = -1;
  forecastDays: number = 7;
  tempAvg: number = -1;

  // Chart
  @ViewChild("chart") chart: ChartComponent | any;  // Chart variable
  public chartOptions: Partial<ChartOptions> | any;
  showVisualisation: boolean = false;

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

      // Filter out locations only in country_code (Australia)
      this.geoCodings = geoCoding.results.filter(
        x => x.country_code == this.countryCode
      )

    });
  }

  /**
   * Check if correct option is selected, then
   * Pass the geolocation to this.getWeatherForecast()
   * 
   * @returns None
   */
  onClickGetForecast():void {
    const targetGeocoding = this.geoCodings.at(this.dropDownSelected)
    if (targetGeocoding == undefined) {
      alert("No location is selected")
      return
    }

    const latitude = targetGeocoding.latitude
    const longitude = targetGeocoding.longitude
    const area = targetGeocoding.name + ", " + targetGeocoding.admin1 + ", " + this.countryCode

    // Get weather forecast
    this.getWeatherForecast(latitude, longitude, area)
  }

  /**
   * Firstly, check if the location is near the ocean
   * If so, get the weather
   * Else, alert user for unavailability
   * 
   * @param latitude a latitude of searching location
   * @param longitude a longitude of searching location
   * @param area the name of the location
   */
  private getWeatherForecast(latitude: number, longitude: number, area: string) {
    // 1. Check if the location is near the ocean
    this.apiService.getMarineForcast(latitude, longitude).subscribe({
      next: _ => {
        // 2. Get weather of the location
        this.apiService.getWeatherForecast(latitude, longitude, this.forecastDays).subscribe({
          next: res => {
            const weather: IWeatherForecast = res.hourly
            const refinedWeather = this.globalService.refineWeatherForecast(weather);

            // Temperature Average
            this.tempAvg = refinedWeather.temperature.reduce((accum, temp) => accum + temp.y, 0)
            this.tempAvg /= refinedWeather.temperature.length;
            this.tempAvg = Number(this.tempAvg.toFixed(2)) // up to 2 decimal places.


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

            const chartTitle = "7 day weather forecast in " + area

            // Build Visualisation
            this.showVisualisation = true;

            // Display Windy Map
            setWindyMap(latitude, longitude);

            // Display Chart
            this.buildChart(chartSeries, chartTitle)
          },
          error: _ => {
            alert("Something went wrong! Please try again!");
          }
        });
      },
      error: _ => {
        // Alert msg if the location is not near sea.
        alert("Coral reefs live under water!");
      }
    })
  }

  /**
   * Build the chart
   * 
   * @param chartSeries data used for building the chart
   * @param chartTitle the title of the chart
   */
  private buildChart(chartSeries: any[], chartTitle: string) {
    // Build graph
    this.chartOptions = {
      series: chartSeries,
      chart: {
        height: 400,
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
