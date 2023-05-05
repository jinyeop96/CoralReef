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

export interface ILatLon {
    latitude: string,
    longitude: string,
    city: string
}

// export interface INewsArray{
//     results: INews[]
// }

// export interface INews {
//     title: string,
//     link: string,
//     description: string,
//     pubDate: string,
//     image_url: string
//     category: string[]
// }

export interface INewsArray{
    articles: INews[]
}

export interface INews {
    author: string,
    title: string,
    url: string,
    description: string,
    publishedAt: string,
    urlToImage: string,
    category: string[],
    papularity: number

}