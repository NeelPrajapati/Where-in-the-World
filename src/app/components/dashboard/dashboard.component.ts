import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  title = 'angular-http-spinner-loader';
  cards: any = [];
  searchByName: any;
  filterByRegion: any = 'select';
  copyCards: any = [];
  activePage: number = 1;
  regionList: any = [];
  cardPerPage: number = 8;
  totalPage: number = 0;
  isNext: boolean = true;
  isPrev: boolean = false;
  isActive: boolean = false;
  pageList: any = [];
  cardsKeys: any;
  sortBy: any = 'select';
  // isNextClick  = false;
  // isPrevClick = false;
  lastSortedByField :any;
  ascendingOrder = true;
  fileName= 'ExcelSheet.xlsx';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private rendered: Renderer2,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.allData();
  }

  allData() {
    this.apiService.getAllCountries().subscribe((result: any) => {
      if (result) {
        this.cards = result;
        this.copyCards = result;
        this.onPageChange(this.activePage);
        this.filterRegion();
        this.storeData();
        // this.onSort();
      }
    });
  }

  storeData(){
    localStorage.setItem('cards',JSON.stringify(this.copyCards));
  }

  filterApply(firstTime: boolean) {
    const data = this.searchByName
      ? this.onSearch(firstTime)
      : this.filterByRegion && this.filterByRegion != 'select'
        ? this.onFilterChange(firstTime)
      : this.sortBy && this.sortBy != 'select'
        ? this.sortByField()
        : this.copyCards;

    this.cards = data.slice(
      (this.activePage - 1) * this.cardPerPage,
      (this.activePage - 1) * this.cardPerPage + this.cardPerPage
    );
    this.totalPage = Math.ceil(data.length / this.cardPerPage);
    this.isPrev = this.activePage > 1 ? true : false;
    this.isNext =
      this.activePage == (this.totalPage == 0 ? 1 : this.totalPage)
        ? false
        : true;
  }

  pages(n: number) {
    return Array(n);
  }

  onSearch(firstTime: boolean) {
    // this.cards = this.copyCards.filter(
    //   (s: any) =>
    //     s?.name?.toLowerCase().includes(this.searchByName?.toLowerCase()) &&
    //     (this.filterByRegion && this.filterByRegion != 'select'
    //       ? this.filterByRegion == s?.region
    //       : true)
    // );
    this.cards = this.copyCards.filter(
      (s: any) =>
        (s?.name?.toLowerCase().includes(this.searchByName?.toLowerCase()) ||
        s?.region?.toLowerCase().includes(this.searchByName?.toLowerCase()) ||
        s?.capital?.toLowerCase().includes(this.searchByName?.toLowerCase())) &&
        (this.filterByRegion && this.filterByRegion != 'select'
          ? this.filterByRegion == s?.region
          : true)
    );

    // console.log(this.copyCards);
    // this.cards = this.copyCards.filter(
    //   (o: any) => {
    //     let keys = Object.keys(o);
    //     console.log('Keys :', keys);
    //     keys.forEach((k) => {
    //       if (typeof o[k] == 'string') {
    //         // console.log(typeof o[k]);
    //         let keyvalue = o[k];
    //         console.log('k is ', k);
    //         if (
    //           keyvalue?.toLowerCase().includes(this.searchByName?.toLowerCase())) {
    //           console.log('Cards : ', o);
    //           let arr : any = []
    //           this.cards.push(o);
    //         }
    //         console.log(this.cards)
    //       }
         
    //     });
    //   }
    // );


    // s?.name?.toLowerCase().includes(this.searchByName?.toLowerCase()) &&
    // (this.filterByRegion && this.filterByRegion != 'select'
    //   ? this.filterByRegion == s?.region
    //   : true)

    if (firstTime) {
      this.activePage = 1;
    }
    return this.cards;
  }

  // onSort(){
  //   this.cards = this.cards.population.sort();
  //   console.log(this.cards);
  // }

  sortByField() {
    // if(this.lastSortedByField === this.sortBy) {
    //   this.ascendingOrder = !this.ascendingOrder;
    // }
    // else {
    //   this.lastSortedByField = this.sortBy;
    //   this.ascendingOrder = true;
    // }

    // if(this.ascendingOrder) {
      // if(this.sortBy == 'select'){
      //   this.sortBy = 'name';
      // }
      let result = this.copyCards.sort((a:any, b:any) => {
        if (a[this.sortBy] < b[this.sortBy])
          return -1;
        if (a[this.sortBy] > b[this.sortBy])
          return 1;
        return 0;
      });
      this.cards = result;
      this.copyCards = result;
      return this.cards
    } 
     
    // else {
  //     this.cards = this.copyCards.sort((a:any, b:any) => {
  //       if (a[this.sortBy] < b[this.sortBy])
  //         return 1;
  //       if (a[this.sortBy] > b[this.sortBy])
  //         return -1;
  //       return 0;
  //     });
  //     return this.cards
  //   }

  // }


  filterRegion() {
    this.regionList = [
      ...new Set(this.copyCards.map((item: any) => item.region)),
    ];
    this.regionList.sort();
  }

  gotoDetails(card: any) {
    this.router.navigate(['/details'], {
      queryParams: { alpha2Code: card.alpha2Code },
    });
  }

  onFilterChange(firstTime: boolean) {
    this.sortByField();
    let result = this.copyCards.filter((s: any) => {
      if (
        s?.region == this.filterByRegion &&
        (this.searchByName ? s?.name == this.searchByName : true)
      ) {
        return s?.name;
      }
    });
    this.cards = result;
    if (firstTime) {
      this.activePage = 1;
    }
    return result;
  }


  exportexcel(){
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }

  onPageChange(pg: number) {
    this.activePage = pg;
    this.filterApply(false);
    if (pg == 1) {
      this.isActive = true;
    }
  }

  onNext() {
    this.activePage = this.activePage + 1;
    this.onPageChange(this.activePage);
  }

  onPrevious() {
    this.activePage = this.activePage - 1;
    this.onPageChange(this.activePage);
  }
}

// ngOnInit(): void {
//   this.allData();
// }

// allData() {
//   this.apiService.getAllCountries().subscribe((result: any) => {
//     if (result) {
//       this.cards = result;
//       this.copyCards = result;
//       this.filterRegion();
//     }
//   });
// }

// filterRegion() {
//   this.regionList = [...new Set(this.copyCards.map((item: any) => item.region))];
//   this.regionList.sort();
// }

// gotoDetails(card: any) {
//   this.router.navigate(['/details'], {
//     queryParams: { alpha2Code: card.alpha2Code },
//   });
// }

// onSearch() {
//   this.cards = this.copyCards.filter((s: any) =>
//       s?.name.toLowerCase().includes(this.searchByName.toLowerCase()) && ((this.filterByRegion && this.filterByRegion != 'select') ? this.filterByRegion == s?.region : true)
//     );
//     // this.paginateData(this.activePage);
//  }

// onFilterChange(value: any) {
//   if(!this.searchByName){
//   let result = this.copyCards.filter((s: any) => {
//     if (s?.region == value ) {
//       return s?.name;
//     }
//   });
//   if (result.length == 0) {
//     result = this.copyCards;
//   }
//   this.cards = result;
// }
// else if(this.searchByName){
//   let result = this.cards.filter((s: any) => {
//     if (s?.region == value ) {
//       return s?.name;
//     }
//   });
//   if (result.length == 0) {
//     result = this.copyCards;
//   }
//   this.cards = result;
// }
// }

// onPrevious() { }

// onNext() { }

// onPageChange() { }
