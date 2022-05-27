import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})

export class SearchFilterPipe implements PipeTransform {

  constructor(){

  }
  
  transform(values: any[], searchByName : any): any {
    if(searchByName){
    const result = values.filter((s:any) => s?.name.toLowerCase().includes(searchByName.toLowerCase()));
    console.log("result", result)
    return result;
    }
    else{
      return values;
    }
    
  }

}
