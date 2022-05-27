import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPagination]',
  exportAs: 'pagination'
})
export class PaginationDirective {
  @Input() TotalPages: any=1;
  pageNo:number = 1;
  @Output() onChangeEventEmitter =new EventEmitter();


  constructor(private rendered: Renderer2, private el:ElementRef) { }


  onNext(){
    this.setPage(Math.min(this.TotalPages, this.pageNo+1))

  }
  onPrevious(){
    this.setPage(Math.max(1, this.pageNo-1))
  }
  setPage(pageno:number){
    this.pageNo = pageno;
    this.rendered.setProperty(this.el.nativeElement,'value', pageno)
    // this.onChangeEventEmitter.emit(pageno);
  }
}
