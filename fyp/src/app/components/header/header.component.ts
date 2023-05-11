import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  title: string = ""
  
  constructor(private route: ActivatedRoute) {}

  // ngOnInit(): void {
  //   this.route.queryParamMap.subscribe( params => {
  //     console.log(params.get('title'))
  //   })
  // }


}
