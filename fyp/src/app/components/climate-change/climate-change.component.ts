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
  public chartOptions: Partial<ChartOptions> | any;

  // Variables
  title: string = ""
  showChart: boolean = true;

  public constructor() {
    this.buildChart('pH', ph, 'area');
  }

  /**
   * Upon user's click action on the tab, it calls chart building funciton with appropriate params.
   * 
   * @param num an int for which chart to build
   */
  onTabButtonClick(num: number) {
    // Reference
    if( num == 3){
      this.showChart = false
      return
    }

    this.showChart = true;

    // pH chart
    if (num == 0) {
      this.title = "Ocean Acidification (pH) from 1989 - 2014"
      this.buildChart('pH', ph, 'area')
    // Co2 chart
    } else if (num == 1) {
      this.title = "Carbon Dioxide (Co2) measurement from 1959 - 2022";
      this.buildChart('ppm', co2, 'line')
    // Ocean Temp chart
    } else {
      this.title = "The average ocean temperature from past to present";
      this.buildChart('°C', oceanTemp, 'area')
    }
  }

  /**
   * Gatehr up the chart options and build.
   * 
   * @param unit a unit of measurement
   * @param data a list of pre-processed data
   * @param type a type of chart. line or area in this case.
   */
  private buildChart(unit: string, data: any[], type: string) {
    // Build graph
    this.chartOptions = {
      series: [
        {
          name: unit,
          data: this.parseData(data)
        }
      ],
      chart: {
        height: 400,
        type: type
      },
      title: {
        text: this.title
      },
      xaxis: {
        type: "datetime"
      }
    }
  }

  /**
   * Process data to have proper time. 
   * x represent time
   * y represent data at the time.
   * 
   * @param data a list of data to process
   * @returns a list of data processed
   */
  private parseData(data: any[]): any {
    let parsed: any[] = []

    data.forEach(d => {
      parsed.push({
        x: new Date(d.x).getTime() - new Date().getTimezoneOffset() * 60 * 1000,
        y: d.y
      })
    })

    return parsed
  }

}
