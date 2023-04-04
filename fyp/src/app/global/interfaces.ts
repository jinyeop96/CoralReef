import { Injectable } from "@angular/core";

// These interfaces are used weather retrieval
export interface IWeather {
    location: ILocation,
    forecast: IForecast
}

export interface ILocation {
    name: string,
    region: string,
    country: string,
    lat: number,
    lon: number,
    localtime: string
}

export interface IForecast {
    forecastday: IForecastDay[]
}

export interface IForecastDay {
    date: string,
    day: IDay,
    hour: IHour[]
}

interface IDay {
    maxtemp_c: number
    mintemp_c: number
}

export interface IHour {
    time: string,
    temp_c: number,
    water_temp_c: number

}


export interface ILatLon {
    lat: number,
    lon: number
}