import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IWeather, ILatLon, IData, IDate } from 'src/app/global/interfaces';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit{

  // variables
  weatherData: IWeather | null = null;
  latLons: ILatLon | null = null;
  date: Date = new Date();
  intervalDays: number = 3;
  intervalHours: number = 3;
  location: string = "Melbourne"; // [(ngModel)] is used to bind with this variable.
  results: IDate[] = []

  // Constructor
  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    // Pass
  }

  /**
   * Triggers upon user clicks button
   * 
   * 1. Retrieves latitude and longitude of the given location
   * 2. Then, retrieves weather for 'intervalDays' of days for every 'intervalHours'
   * 3. 
   */
  getWeather() {
    // Retrieve latitude and longitude of the location
    this.apiService.getLatAndLong(this.location).subscribe( res => {
      // Set the lat and lon for the location
      this.latLons = {
        lat : res[0].lat,
        lon : res[0].lon
      }

      // If the location is not wrong
      if ( this.latLons != null ) {
        // Determines day intervals
        const from = this.date.toJSON();
        this.date.setDate(this.date.getDate() + this.intervalDays) 
        const to = this.date.toJSON()
        this.date.setDate(this.date.getDate() - this.intervalDays) 

        // Retrieve the weather data for the location if the latitude and longitude is found  
        this.apiService.getWeatherData(from, this.intervalHours, to, this.latLons.lat, this.latLons.lon).subscribe(res => {
          this.weatherData = res  // Retrieved weather data
          this.results = []   // reset the result array

          let tempDate = new Date(this.date.getTime() - (this.date.getTimezoneOffset() * 60000))
          
          // Loop through to save correct data into results array
          this.weatherData.data.at(0)?.coordinates.at(0)?.dates.forEach( x => {
            let tempResult: IDate = {
              date: tempDate.toJSON(),
              value: x.value
            }
            this.results.push(tempResult)

            tempDate.setHours(tempDate.getHours() + this.intervalHours)
          })
        })
      }
    })

    


    
    
  }


}
