import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.sass'],
})
export class NotFoundComponent {
  sectionHeight: number;

  constructor(@Inject(DOCUMENT) document: HTMLDocument) {
    this.sectionHeight =
      window.innerHeight - document.getElementById('footer').offsetHeight;
  }
}
