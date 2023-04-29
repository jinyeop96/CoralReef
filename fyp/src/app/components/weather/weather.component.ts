import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';
import { IResult } from 'src/app/global/interfaces';

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
  country_code: string = "AU";
  location: string = "";

  geoCodings: IResult[] = []
  dropDownSelected: number = -1;
  radioChecked: number = -1;
  forecastDays: number = 7;

  // ------------ Constructor ------------ 
  constructor(private apiService: ApiService, private globalService: GlobalService) { }

  /**
   * Listens for the user input.
   * Whenever an input is changed, it gets the geocodings for locations
   */
  //  onKeyUp(){
  //   this.apiService.getGeoLocation(this.location).subscribe( geoCoding => {
  //     // Reset
  //     this.geoCodings=[]  
  //     this.dropDownSelected = 0
      
  //     // Pre : if no such location was found, terminate.
  //     if (geoCoding.results == undefined){
  //       this.dropDownSelected = -1
  //       return
  //     }
      
  //     // Filter out locations only in country_code (Australia).
  //     // UNCOMMENT the following to allow all locations in the world. // this.geocodingResults = geoCoding.results
      
  //     geoCoding.results.forEach( result =>{
  //       if(result.country_code == this.country_code){
  //         this.geoCodings.push(result)
  //       }
  //     })

  //   });

}
