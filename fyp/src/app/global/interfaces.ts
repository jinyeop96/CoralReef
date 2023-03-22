import { Injectable } from "@angular/core";

// These interfaces are used weather retrieval
export interface IWeather {
    dataGenerated: any,
    data: IData[]
}

export interface IData {
    coordinates: ICoordinate[]
}
  
export interface ICoordinate {
    dates: IDate[]
}

export interface IDate {
    date: any,
    value: number
}

export interface ILatLon {
    lat: number,
    lon: number
}
