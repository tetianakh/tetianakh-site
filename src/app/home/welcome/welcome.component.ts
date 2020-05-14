import { Component, OnInit } from '@angular/core';
import { scrollToId } from 'src/app/shared/scroll.utils';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass'],
})
export class WelcomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  scrollToResume() {
    scrollToId('resume');
  }

  scrollToContact() {
    scrollToId('contact');
  }
}
