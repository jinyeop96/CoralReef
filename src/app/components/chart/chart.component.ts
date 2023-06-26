import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DatabaseService } from 'src/app/services/database.service';
// import { IWeather, ILatLon, ILocation, IForecastDay, IForecast, IHour } from 'src/app/global/interfaces';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
  // Not in use variables
  // latLons: ILatLon | null = null;
  // date: Date = new Date();
  // intervalHours: number = 3;

  // Variables
  days: number = 3;
  location: string = "Melbourne"; // [(ngModel)] is used to bind with this variable.
  
  // resultLocation: ILocation | null = null;
  // forecastDays: IForecastDay[] = [];

  // states = [
  //   {id: 0, name: "New South Wales", abbr: "NSW"},
  //   {id: 1, name: "Victoria", abbr: "VIC"},
  //   {id: 2, name: "Queensland", abbr: "QLD"},
  //   {id: 3, name: "Western Australia", abbr: "WA"},
  //   {id: 4, name: "South Australia", abbr: "SA"},
  //   {id: 5, name: "Tasmania", abbr: "TAS"},
  //   {id: 6, name: "Northern Territory", abbr: "NT"}
  // ]

  // selectedState: string = "New South Wales";


  // Constructor
  constructor(private apiService: ApiService, private dbService: DatabaseService) { }

  ngOnInit(): void {
    // Pass
  }

  /**
   * Triggers upon user clicks button
   * 
   * subscribes to an observable contatining air and marine forecast
   * Once, it returns data, distributes on HTML
   */
  // getWeather() {
  //   this.apiService.getWeatherData(this.location, 7).subscribe(res => {
  //     let weatherData: IWeather = res
  //     this.resultLocation = weatherData.location;
  //     this.forecastDays = weatherData.forecast.forecastday
  //   })
  // }

  /**
   * Returns latitude and longitude 
   * @param location a target location
   */
  // getLatLon(location: string) {
  //   this.apiService.getLatAndLong(this.location).subscribe(res => {
  //     // Set the lat and lon for the location
  //     this.latLons = {
  //       lat: res[0].lat,
  //       lon: res[0].lon
  //     }
  //   })
  // }

  // postTest() {
  //   let newTest = {
  //     location: this.location,
  //     state: this.selectedState
  //   }
  //   this.dbService.postTest(newTest).subscribe( res => {
  //     console.log(res);
  //   });
  // }

  // getTest() {
  //   this.dbService.getTest().subscribe( res => {
  //     let result:any = []
  //     result = res

  //     console.log(result[0])
  //     console.log(result[1])
      
  //   })
  // }
}
