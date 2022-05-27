import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  detail: any = [];
  languages: any = [];
  borderCountries: any = [];
  cards: any = [];
  copyCards: any = [];
  alpha2CodeArr: any = [];
  obj : any;
  isNextClick : boolean = false;
  isPrevClick : boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit() {
    this.getCountryByCode();
    this.getData();
    this.copyCards.forEach((c: any) => {
      this.alpha2CodeArr.push(c.alpha2Code);
    });
  }

  getData() {
    let data: any = localStorage.getItem('cards');
    this.cards = JSON.parse(data);
    this.copyCards = JSON.parse(data);
  }

  getCountryByCode() {
    this.route.queryParams.subscribe((params) => {
      const obj = Object.keys(params);
      this.obj = params;
      this.apiService
        .getAllDetails(params[obj[0]])
        .subscribe((response: any) => {
          this.detail = response;
          this.languages = response.languages;
          this.borderCountries = response.borders ?? [];
        });
    });
  }

  gotoDashboard() {
    // this._location.back();
    this.router.navigate(['/dashboard']);
  }

  onPrevCountry(){
    let index = this.alpha2CodeArr.findIndex((a:any)=> a == this.obj['alpha2Code']);
    this.router.navigate(['/details'], {
      queryParams: { alpha2Code: this.copyCards[index - 1]['alpha2Code'] },
    });

  }

  onNextCountry(){
    let index = this.alpha2CodeArr.findIndex((a:any)=> a == this.obj['alpha2Code']);
    this.router.navigate(['/details'], {
      queryParams: { alpha2Code: this.copyCards[index + 1]['alpha2Code'] },
    });

  }

  goToBorderCountryDetails(detail: any) {
    this.router.navigate(['/details'], {
      queryParams: { alpha3Code: detail },
    });
  }
}
