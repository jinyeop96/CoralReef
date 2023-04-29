import { Component, ViewChild } from '@angular/core';
import co2 from '../../../assets/json/co2.json'
import ph from '../../../assets/json/ph.json'
import oceanTemp from '../../../assets/json/oceanTemp.json'

// ApexCharts
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-climate-change',
  templateUrl: './climate-change.component.html',
  styleUrls: ['./climate-change.component.css']
})
export class ClimateChangeComponent {
  // ApexCharts variables
  @ViewChild("chart") chart: ChartComponent | any;
  public phChartOptions: Partial<ChartOptions> | any;
  public co2ChartOptions: Partial<ChartOptions> | any;
  public oceanTempChartOptions: Partial<ChartOptions> | any;

  public constructor() {
    this.buildPhChart();
    this.buildCo2Chart();
    this.buildOceanTempChart();
  }

  private buildPhChart() {
    // Build graph
    this.phChartOptions = {
      series: [
        {
          name: "My-series",
          data: this.parseData(ph)
        }
      ],
      chart: {
        height: 350,
        width: 1000,
        type: "area"
      },
      title: {
        text: "Ocean Acidification (pH) from 1989 - 2014"
      },
      xaxis: {
        type: "datetime"
      }
    };

  }

  private buildCo2Chart() {
    this.co2ChartOptions = {
      series: [
        {
          name: "Co2 in ppm",
          data: this.parseData(co2)
        }
      ],
      chart: {
        height: 500,
        type: "line",
        width: 1000
      },
      title: {
        text: "Carbon Dioxide (Co2) measurement from 1959 - 2022"
      },
      xaxis: {
        type: "datetime"
      }
    };


  }

  private buildOceanTempChart() {
    this.oceanTempChartOptions = {
      series: [
        {
          name: "in °C",
          data: this.parseData(oceanTemp)
        }
      ],
      chart: {
        height: 500,
        type: "area",
        width: 1000
      },
      title: {
        text: "The average ocean temperature from past to present"
      },
      xaxis: {
        type: "datetime"
      }
    }
  }

  private parseData(data: any[]): any{
    let parsed: any[] = []

    data.forEach( d => {
      parsed.push({
        x: new Date(d.x).getTime() -new Date().getTimezoneOffset()*60*1000,
        y: d.y
      })
    })

    return parsed
  }

}
