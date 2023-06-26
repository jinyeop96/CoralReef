import { Component } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private map: MapService) { }
  userInfo: any = null;
  ngDoCheck() {
    this.userInfo = this.map.user;
  }
  logout() {
    this.map.user = null;
    localStorage.removeItem('user');
  }
}

