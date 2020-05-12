import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass'],
})
export class WelcomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  scrollToResume() {
    const element = document.querySelector('#resume');
    console.log(element);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
