import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  
  postTest(data: any) {
    return this.http.post('/chart/postTest', data, httpOptions);
  }

  getTest() {
    return this.http.get('/chart/getTest');
  }
}
