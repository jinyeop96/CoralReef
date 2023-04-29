import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchText = "";
  organisms: any = [];

  constructor(private http: HttpClient){} // Dependency Injection

  onSearch() {
    console.log(this.searchText);
    this.http.get("/api/organism?genus=" + this.searchText).subscribe((res: any) => {
      this.organisms = res;
    });
  }

}
