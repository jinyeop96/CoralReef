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
    console.log(this.searchText);
    this.http.get("/organism?genus=" + this.searchText).subscribe((res: any) => {
      this.organisms = res;
    });
  }

  filterChange(value: string) {
    this.http.get("/organism?genus=" + value).subscribe((res: any) => {
      this.organisms = res;
    });
  }
}
