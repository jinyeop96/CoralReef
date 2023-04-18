import { Component } from '@angular/core';
import * as echarts from 'echarts';
import { data } from './data3';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  ngOnInit(): void {
    console.log(123);
    console.log(echarts);
    var chartDom:any = document.getElementById('map');
    var myChart = echarts.init(chartDom);
    var option;
    // myChart.showLoading();
    // myChart.hideLoading();
    echarts.registerMap('AUS', data, {
      Alaska: {
        left: -131,
        top: 25,
        width: 15
      },
      Hawaii: {
        left: -110,
        top: 28,
        width: 5
      },
      'Puerto Rico': {
        left: -76,
        top: 26,
        width: 2
      }
    });
    option = {
      title: {
        text: 'AUS xxxx',
        subtext: 'Data from xxx',
        sublink: 'http://www.census.gov/popest/data/datasets.html',
        left: 'right'
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2
      },
      visualMap: {
        min: 800,
        max: 50000,
        text: ['High', 'Low'],
        calculable: true,
        inRange: {
          color: ['lightskyblue', 'lightgreen']
        },

        left: 'right',
      },
      toolbox: {
        show: true,
        //orient: 'vertical',
        left: 'left',
        top: 'top',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: 'xxxx',
          type: 'map',
          roam: true,
          map: 'AUS',
          emphasis: {
            label: {
              show: true
            }
          },
          data: [
            { name: 'New South Wales', value: 48023 },
            { name: 'Victoria', value: 7349 },
            { name: 'Queensland', value: 5255 },
            { name: 'South Australia', value: 29491 },
            { name: 'Western Australia', value: 38430 },
            { name: 'Tasmania', value: 1875 },
            { name: 'Northern Territory', value: 9034 },
          ]
        }
      ]
    };
    myChart.setOption(option);
  }
}
