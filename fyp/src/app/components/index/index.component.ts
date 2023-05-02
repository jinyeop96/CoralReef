import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IWeatherForecast } from 'src/app/global/interfaces';
import { GlobalService } from 'src/app/services/global.service';

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
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  // ------------- Variables -------------
  @ViewChild("chart") chart: ChartComponent | any;  // Chart variable
  public chartOptions: Partial<ChartOptions> | any;

  chartTitle = "";
  showLoadingBar: boolean = true;

  constructor(private apiService: ApiService, private globalService: GlobalService) { }

  /**
   * Upon initialising the main page, get the geolocation through IP address.
   * Then it retrives weather forecast for the location.
   */
  ngOnInit(): void {
    this.apiService.getGeoLocationByIP().subscribe(res => {
      const lat = Number(res.latitude);
      const long = Number(res.longitude);
      const location = res.city;
      const forecastDays = 1;

      // Get the weather forecast.
      this.apiService.getWeatherForecast(lat, long, forecastDays).subscribe(res => {
        const weather: IWeatherForecast = res.hourly
        const refinedWeather = this.globalService.refineWeatherForecast(weather);


        // Process to build chart
        const chartSeries = [{
          name: "Temperature",
          data: refinedWeather.getTemperature()
        }, {
          name: "Precipitation",
          data: refinedWeather.getPrecipitation()
        }, {
          name: "Precipitation Probability",
          data: refinedWeather.getPrecipitationProbability()
        }, {
          name: "Wind Speed",
          data: refinedWeather.getWindspeed()
        }]
        this.chartTitle = "today's weather in " + location;

        this.buildChart(chartSeries)

      })
    })

  }

  private buildChart(chartSeries: any[]) {
    // Disable the loading bar
    this.showLoadingBar = false;

    this.chartOptions = {
      series: chartSeries,
      chart: {
        height: 350,
        type: "line"
      },
      // title: {
      //   text: chartTitle
      // },
      xaxis: {
        type: "datetime"
      }
    };
  }




}
