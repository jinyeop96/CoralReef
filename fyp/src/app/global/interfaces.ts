import { Injectable } from "@angular/core";

export interface IGeocoding {
    results: IResult[]
}

export interface IResult {
    name: string,
    latitude: number,
    longitude: number,
    country_code: string
    admin1: string
}

export interface IWeather{
    hourly: IWeatherForecast 
}

export interface IWeatherForecast {
    time: string[],
    temperature_2m: number[],
    precipitation_probability: number[],
    precipitation: number[],
    windspeed_10m: number[]
}

export interface IMarine{
    hourly: IMarineForecast
}

export interface IMarineForecast{
    time: string[],
    wave_height: number[],
    swell_wave_height: number[],
}