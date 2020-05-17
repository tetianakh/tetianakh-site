import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'tetianakh';
  constructor(private router: Router) {}

  ngOnInit() {
    let path = localStorage.getItem('path');
    if (path) {
      localStorage.removeItem('path');
      this.router.navigate([path]);
    }
  }
}
