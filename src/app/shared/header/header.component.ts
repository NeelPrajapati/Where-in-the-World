import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  images: any = [];
  imageIndex: any = 0;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.images = ['./assets/light.png', './assets/dark.png']
  }
  
  toggleTheme() {
    this.imageIndex++;
    if (this.imageIndex === this.images.length) {
      this.imageIndex = 0;
    }
    document.body.classList.toggle('light-theme');
  }

  gotoDashboard() {
    // this._location.back();
    this.router.navigate(['/dashboard']);
  }
}
