import { Injectable } from '@angular/core';
import { Weather } from '../global/classes';
import { IWeatherForecast } from '../global/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  refineWeatherForecast(weather: IWeatherForecast): Weather{
      let temperature: any[] = []
      let precipitation: any[] = []
      let precipitation_probability: any[] = []
      let windspeed: any[] = []
      
      weather.time.forEach( (t, i) => {
        const time = new Date(t).getTime() -new Date().getTimezoneOffset()*60*1000
        
        temperature.push({
          x: time,
          y: weather.temperature_2m.at(i)
        });

        precipitation.push({
          x: time,
          y: weather.precipitation.at(i)
        });

        precipitation_probability.push({
          x: time,
          y: weather.precipitation_probability.at(i)
        })

        windspeed.push({
          x: time,
          y: weather.windspeed_10m.at(i)
        })
      });

      return new Weather(temperature, precipitation, precipitation_probability, windspeed)
  }
}
