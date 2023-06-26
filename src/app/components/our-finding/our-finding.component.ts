import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import embed from 'vega-embed';
import vg_1 from './human.json';
import vg_2 from './ph.json';
import vg_3 from './Temp.json';
import vg_4 from './sal.json';

@Component({
  selector: 'app-our-finding',
  templateUrl: './our-finding.component.html',
  styleUrls: ['./our-finding.component.css']
})
export class OurFindingComponent implements AfterViewInit {

  @ViewChild('map1') map1!: ElementRef;
  @ViewChild('map2') map2!: ElementRef;
  @ViewChild('map3') map3!: ElementRef;
  @ViewChild('map4') map4!: ElementRef;

  ngAfterViewInit(): void {
    embed(this.map1.nativeElement, vg_1 as any, {"actions": false}).then((result) => {

    }).catch(console.error);

    embed(this.map2.nativeElement, vg_2 as any, {"actions": false}).then((result) =>  {

    }).catch(console.error);

    embed(this.map3.nativeElement, vg_3 as any, {"actions": false}).then((result) => {
      // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
    }).catch(console.error);

    embed(this.map4.nativeElement, vg_4 as any, {"actions": false}).then((result) => {
      // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
    }).catch(console.error);
  }

}
