import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  genus: string[] = [];
  searchText = "";
  organisms: any = [];
  image = "assets/images/coral4.png";

  constructor(private http: HttpClient){} // Dependency Injection

  ngOnInit(): void {
       this.getAllGenus();
  }

  getAllGenus(): void {
    this.http.get("/organism/genus").subscribe((res: any) => {
      this.genus = res;
    });
  }

  onSearch() {
    this.http.get("/organism?genus=" + this.searchText).subscribe((res: any) => {
      this.organisms = res;
    });
    this.searchImageAPI();
  }

  filterChange(value: string) {
    this.http.get("/organism?genus=" + value).subscribe((res: any) => {
      this.organisms = res;
    });
    this.searchImageAPI();
  }

  searchImageAPI() {
    this.http.get("https://api.unsplash.com/photos/random?query=coral reef&client_id=H7dAvU5LmvCYCAN3npjukaTIu1gbEPA2R2--uwlwjX8&count=1").subscribe((res: any) => {
      if (res && res.length > 0) {
        this.image = res[0].urls.full;
      }
    })
  }
}
