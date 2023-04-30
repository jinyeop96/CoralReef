import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'fyp';

  constructor() {}

  onActivate(event: any): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })    
  }
}
