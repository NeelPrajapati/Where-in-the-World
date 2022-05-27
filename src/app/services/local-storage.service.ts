import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getCookie(name:any){
    return localStorage.getItem(name)
  }

  setCookie(name:any, data:any){
    return localStorage.setItem(name,data)
  }

}
