import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { IResult, IWeatherForecast } from 'src/app/global/interfaces';
import { ApiService } from 'src/app/services/api.service';

declare function setWindyMap(lat: number, lon:number): void;

// ApexCharts
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { GlobalService } from 'src/app/services/global.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-live-data',
  templateUrl: './live-data.component.html',
  styleUrls: ['./live-data.component.css']
})
export class LiveDataComponent implements AfterViewInit{
  // ------------ Searching location ------------ 
  country_code: string = "AU";
  location: string = "";
  
  geoCodings: IResult[] = []
  dropDownSelected: number = -1;
  radioChecked: number = -1;
  forecastDays: number = 7;

  path = "https://embed.windy.com/embed2.html?lat=-31.9523&lon=115.8613&detailLat=-33.665&detailLon=149.136&width=650&height=450&zoom=5&level=surface&overlay=sst&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
  @ViewChild('iframe') iframe: ElementRef | any

  // ------------ Chart  ------------ 
  @ViewChild("chart") chart: ChartComponent | any;  // Chart variable
  public chartOptions: Partial<ChartOptions> | any;
  showChart: Boolean = false;
  showMarineMap: Boolean = false;
  showTempMap: Boolean = false;
  
  

  // Inject dependency
  constructor(private apiService: ApiService, private globalService: GlobalService) {
    // let myScriptElement: HTMLScriptElement;
    // myScriptElement = document.createElement("script");
    // myScriptElement.src = "../../../assets/js/windy_map/script.js";
    // document.body.appendChild(myScriptElement);
    // var ifrm = document.createElement("iframe");
    // ifrm.setAttribute("src", this.path);
    // ifrm.style.width = "100%";
    // ifrm.style.height = "480px";
    // document.body.appendChild(ifrm)
    

    
    // apiService.getGeoLocationByIP().subscribe(res => {
    //   const lat = Number(res.latitude);
    //   const lon = Number(res.longitude);
    //   setWindyMap(lat, lon);
    // })
    
  }


  ngAfterViewInit(): void {
    console.log(document.getElementById('myFrame'))
  }

  

  /**
   * Listens for the user input.
   * Whenever an input is changed, it gets the geocodings for locations
   */
  onKeyUp(){
    this.apiService.getGeoLocation(this.location).subscribe( geoCoding => {
      // Reset
      this.geoCodings=[]  
      this.dropDownSelected = 0
      
      // Pre : if no such location was found, terminate.
      if (geoCoding.results == undefined){
        this.dropDownSelected = -1
        return
      }
      
      // Filter out locations only in country_code (Australia).
      // UNCOMMENT the following to allow all locations in the world. // this.geocodingResults = geoCoding.results
      
      geoCoding.results.forEach( result =>{
        if(result.country_code == this.country_code){
          this.geoCodings.push(result)
        }
      })

    });
  }

  onClickGetForecast(){
    // Pre 1 : check if radio button is checked
    if (this.radioChecked == -1){
      alert("Please check either one of Weather and Marine")
      return 
    }

    const targetGeocoding = this.geoCodings.at(this.dropDownSelected)
    if (targetGeocoding == undefined){
      alert("No location is selected")
      return
    }
    
    // Pre 2 : check if drop down menu is selected
    const latitude = targetGeocoding.latitude
    const longitude = targetGeocoding.longitude
    const area = targetGeocoding.name + ", " + targetGeocoding.admin1 + ", " + this.country_code
    
    if(this.radioChecked == 0){
      this.getWeatherForecast(latitude, longitude, area) // Get weather forecast
    } else {
      this.getMarineForecast(latitude, longitude, area)  // Get marine forecast
    }

  }

  private getWeatherForecast(latitude: number, longitude: number, area: string){
    
    this.apiService.getWeatherForecast(latitude, longitude, this.forecastDays).subscribe( res => {
      const weather: IWeatherForecast = res.hourly
      const refinedWeather = this.globalService.refineWeatherForecast(weather);

      // Process to build chart
      const chartSeries = [{
        name: "Temperature",
        data: refinedWeather.temperature
      }, {
        name: "Precipitation",
        data: refinedWeather.precipitation
      }, {
        name: "Precipitation Probability",
        data: refinedWeather.precipitation_probability
      }, {
        name: "Wind Speed",
        data: refinedWeather.windspeed
      }]
      this.showMarineMap = false
      this.showTempMap = true
      const chartTitle = "7 day weather forecast in " + area

      // Display Windy Map
      setWindyMap(latitude, longitude);
      
      this.buildChart(chartSeries, chartTitle)
      
      
    });
  }

  private getMarineForecast(latitude: number, longitude: number, area: string){
    this.apiService.getMarineForcast(latitude, longitude).subscribe( res => {
      if (res.hourly == undefined){
        alert("No data is available for this location")
        return 
      }
      
      let waveHeight: any[] = []
      let swellHeight: any[] = []

      res.hourly.time.forEach( (t, i) => {
        const time = new Date(t).getTime() -new Date().getTimezoneOffset()*60*1000

        waveHeight.push({
          x: time,
          y: res.hourly.wave_height.at(i)
        })

        swellHeight.push({
          x: time,
          y: res.hourly.swell_wave_height.at(i)
        })

      })

      // Process to build chart
      const chartSeries = [{
        name: "Wave Height",
        data: waveHeight
      }, {
        name: "Swell Height",
        data: swellHeight
      }]
      this.showMarineMap = true
      this.showTempMap = false
      const chartTitle = "7 day marine forecast in " + area


      this.buildChart(chartSeries, chartTitle)

      // Marine map
      this.path = "https://embed.windy.com/embed2.html?lat="+latitude+"&lon="+longitude+"&detailLat=-33.665&detailLon=149.136&width=650&height=450&zoom=5&level=surface&overlay=sst&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
    
      console.log(document.getElementById('myFrame'))
      // marineMap.setAttribute('src', this.path)
      
      
      

      

      
    });
  }

  private buildChart(chartSeries: any[], chartTitle: string) {
    this.showChart = true;
    
    // Build graph
    this.chartOptions = {
      series: chartSeries,
      chart: {
        height: 350,
        width: 1000,
        type: "line"
      },
      title: {
        text: chartTitle
      },
      xaxis: {
        type: "datetime"
      }
    };

  }


}
