// Angular Modules
import { Injectable } from '@angular/core'; 

@Injectable()
export class Constants {
    public static readonly API_WEATHER_ENDPOINT: string = "https://api.weatherapi.com/v1/";
    public static readonly API_WEATHER_KEY: string = "a3912450f1bc4915b6a91004232303";
    public static readonly API_LAT_LONG_ENDPOINT: string = "http://api.openweathermap.org/geo/1.0/direct?"

}