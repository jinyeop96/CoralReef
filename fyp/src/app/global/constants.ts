// Angular Modules
import { Injectable } from '@angular/core'; 

@Injectable()
export class Constants {
    public static readonly API_WEATHER_ENDPOINT: string = "https://api.meteomatics.com/"; 
    public static readonly API_LAT_LONG_ENDPOINT: string = "http://api.openweathermap.org/geo/1.0/direct?"

}