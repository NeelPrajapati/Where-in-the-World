import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllCountries() {
    return this.http.get('https://restcountries.com/v2/all');
  }

  getAllDetails(code: any) {
    return this.http.get(`https://restcountries.com/v2/alpha/${code}`);
  }

}
