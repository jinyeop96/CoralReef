import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }
  getCorals() {
    return this.http.get('/corals_return.json');
  }
  user: any = localStorage.getItem('user') || null
}
