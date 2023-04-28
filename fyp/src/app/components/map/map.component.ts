import { Component } from '@angular/core';
import * as echarts from 'echarts';
import { data } from './data3';
import { MapService } from 'src/app/services/map.service';
import corals from '../../../assets/json/corals_return.json'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  constructor(private map: MapService) { }
  list:any = [];
  ngOnInit(): void {
    console.log(corals)
    // this.map.getCorals()
    //   .subscribe(res=>{
    //     console.log(res)
    //   })
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
    const count = corals.result.list.map(item=>(
      {
        name: item.region_name,
        value: item.data.length
      }
    ))
    option = {
      title: {
        text: 'The distribution of coral reefs in different states of Australia',
        subtext: 'Data from: https://www.ala.org.au',
        sublink: 'https://www.ala.org.au',
        left: 'right'
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2
      },
      visualMap: {
        min: 0,
        max: 800,
        text: ['High', 'Low'],
        calculable: true,
        inRange: {
          color: ['lightskyblue', 'lightgreen']
        },

        left: 'right',
      },
      // toolbox: {
      //   show: true,
      //   //orient: 'vertical',
      //   left: 'left',
      //   top: 'top',
      //   feature: {
      //     dataView: { readOnly: false },
      //     restore: {},
      //     saveAsImage: {}
      //   }
      // },
      series: [
        {
          name: 'Category',
          type: 'map',
          roam: true,
          map: 'AUS',
          emphasis: {
            label: {
              show: true
            }
          },
          data: count
        }
      ]
    };
    myChart.setOption(option);
    myChart.on('click',(item)=>{
      this.list = corals.result.list.find(i => i.region_name==item.name)?.data;
    })
  }
}
