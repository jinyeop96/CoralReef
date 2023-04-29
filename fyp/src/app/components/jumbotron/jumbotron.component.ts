import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {

  jumbotronTitle: string = ""
  
  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    // Subscribe to it, so it can be notified when route is changed
    this.route.queryParamMap.subscribe( map => {
      this.jumbotronTitle = map.get('title') as string
    })
  }

}
