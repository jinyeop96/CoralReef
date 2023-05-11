import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  title: string | any = ""
  subTitle = "We provide information about coral reef ecosystem"
  showSubTitle: boolean = true;
  
  constructor(private route: ActivatedRoute) {}

  // ngOnInit(): void {
  //   this.route.queryParamMap.subscribe( params => {
  //     const paramTitle = params.get('title');

  //     if( paramTitle == null || paramTitle == undefined) {
  //       this.title = "Welcome to Coral Reef"
  //       this.showSubTitle = false;
  //     } else if (paramTitle.toUpperCase() == 'HOME'){
  //       this.title = "Welcome to Coral Reef"
  //       this.showSubTitle = true;
  //     } else {
  //       this.title = paramTitle
  //       this.showSubTitle = false;
  //     }
  //   })
  // }


}
